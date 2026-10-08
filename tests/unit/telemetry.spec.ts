import { reportTelemetry } from '@seshuk/payload-plugin-tooling/telemetry'
import type { Config, Payload } from 'payload'
import { describe, expect, it, vi } from 'vitest'

import { openapi, scalar, swaggerUi } from '@/index.js'
import { resolveOptions } from '@/server/options/resolveOptions.js'
import { buildFeatures } from '@/server/telemetry.js'
import { PLUGIN_NAME, SCALAR_PLUGIN_NAME, SWAGGER_UI_PLUGIN_NAME } from '@/shared/constants.js'
import type { OpenApiPluginOptions } from '@/shared/types/index.js'

vi.mock('@seshuk/payload-plugin-tooling/telemetry', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@seshuk/payload-plugin-tooling/telemetry')>()),
  reportTelemetry: vi.fn(async () => {}),
}))

const info = { title: 'API', version: '1.0.0' }

describe('plugin metadata', () => {
  it('sets the slug and options on openapi(), scalar() and swaggerUi()', () => {
    const options = { info }
    const plugin = openapi(options)
    expect(plugin.slug).toBe(PLUGIN_NAME)
    expect(plugin.options).toBe(options)
    expect(scalar().slug).toBe(SCALAR_PLUGIN_NAME)
    expect(scalar().options).toBeUndefined()
    const swagger = swaggerUi({ path: '/swagger' })
    expect(swagger.slug).toBe(SWAGGER_UI_PLUGIN_NAME)
    expect(swagger.options).toEqual({ path: '/swagger' })
  })
})

describe('buildFeatures', () => {
  const features = (options: Partial<OpenApiPluginOptions> = {}, plugins: Config['plugins'] = []) =>
    buildFeatures({
      plugins: Object.fromEntries((plugins ?? []).map((p) => [p.slug, p])),
      resolved: resolveOptions({ info, ...options }),
    })

  it('sets only the defaults for a bare config', () => {
    expect(features()).toEqual({
      access: false,
      cache: true,
      extensions: false,
      extensionTransform: false,
      filtersEntities: false,
      filtersExcludeOperations: false,
      filtersIncludeSystem: false,
      interactiveAuth: false,
      nestedTags: false,
      openapiVersion30: false,
      openapiVersion31: false,
      security: false,
      serve: true,
      servers: false,
      trustedHosts: false,
      uiScalar: false,
      uiSwagger: false,
    })
  })

  it('sets a flag for each option in use', () => {
    const result = features({
      access: () => true,
      cache: false,
      extensions: [{ transform: ({ doc }) => doc }],
      filters: { exclude: ['posts'], excludeOperations: [{ method: 'delete' }], includeSystem: true },
      interactiveAuth: true,
      nestedTags: true,
      openapiVersion: '3.0',
      security: () => undefined,
      serve: false,
      servers: [{ url: 'https://api.example.com' }],
      trustedHosts: ['api.example.com'],
    })
    expect(Object.entries(result).filter(([, on]) => !on)).toEqual([
      ['cache', false],
      ['openapiVersion31', false],
      ['serve', false],
      ['uiScalar', false],
      ['uiSwagger', false],
    ])
  })

  it('finds the docs UI plugins by slug', () => {
    expect(features({}, [scalar(), swaggerUi()])).toMatchObject({ uiScalar: true, uiSwagger: true })
    expect(features({ openapiVersion: '3.1' }, [swaggerUi()])).toMatchObject({
      openapiVersion31: true,
      uiScalar: false,
      uiSwagger: true,
    })
  })
})

describe('telemetry onInit', () => {
  const payload = { config: {} } as unknown as Payload
  const init = async (options: Partial<OpenApiPluginOptions> = {}, onInit?: Config['onInit']) => {
    const config = await openapi({ info, ...options })({
      collections: [],
      onInit,
      plugins: [scalar()],
    } as unknown as Config)
    await config.onInit?.(payload)
  }

  it('reports after the existing onInit resolves', async () => {
    const order: string[] = []
    const onInit = vi.fn(async () => {
      await Promise.resolve()
      order.push('onInit')
    })
    vi.mocked(reportTelemetry).mockImplementationOnce(async () => {
      order.push('telemetry')
    })

    await init({}, onInit)

    expect(onInit).toHaveBeenCalledWith(payload)
    expect(order).toEqual(['onInit', 'telemetry'])
    expect(reportTelemetry).toHaveBeenLastCalledWith(
      expect.objectContaining({
        features: expect.objectContaining({ uiScalar: true }),
        packageName: PLUGIN_NAME,
        payload,
        product: 'payload-plugin-openapi',
      }),
    )
  })

  it.each([
    [{}, undefined],
    [{ telemetry: false }, false],
    [
      { telemetry: { url: 'https://telemetry.example.com/v1/collect' } },
      { url: 'https://telemetry.example.com/v1/collect' },
    ],
  ] as const)('passes the opt-out env and option %j to the tooling', async (options, option) => {
    await init(options)

    expect(vi.mocked(reportTelemetry).mock.lastCall![0]).toMatchObject({
      disableEnv: 'OPENAPI_TELEMETRY_DISABLED',
      option,
    })
  })

  it('adds no onInit when `enabled` is false', async () => {
    const config = await openapi({ info, enabled: false })({ collections: [] } as unknown as Config)
    expect(config.onInit).toBeUndefined()
  })
})
