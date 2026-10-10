import type { PathsObject, SecurityRequirementObject } from '@scalar/openapi-types/3.2'
import type { Access, SanitizedConfig } from 'payload'

import { PLUGIN_NAME } from '@/shared/constants.js'
import type {
  Entity,
  EntityOperation,
  EntitySecurityOverride,
  HttpMethod,
  OperationKind,
  SecurityOption,
} from '@/shared/types/index.js'
import { isPlainObject } from '@/shared/utils.js'

import { INTERACTIVE_SCHEME_NAME, SECURITY_SCHEME_NAME } from './components.js'
import { operationPlugin } from './filters.js'

const HTTP_METHODS: HttpMethod[] = ['get', 'post', 'patch', 'put', 'delete']

export const securedRequirement = (login = false): SecurityRequirementObject[] =>
  login ? [{ [SECURITY_SCHEME_NAME]: [] }, { [INTERACTIVE_SCHEME_NAME]: [] }] : [{ [SECURITY_SCHEME_NAME]: [] }]

type ProbedOperation = EntityOperation | 'readVersions'

const OVERRIDE_FALLBACK: Partial<Record<ProbedOperation, EntityOperation>> = {
  readVersions: 'read',
  validate: 'update',
}

export type EntitySecurity = Partial<Record<ProbedOperation, SecurityRequirementObject[] | undefined>>

const withTimeout = async (promise: Promise<unknown>, timeoutMs: number): Promise<boolean> => {
  let timer: ReturnType<typeof setTimeout> | undefined
  const guard = new Promise<false>((resolve) => {
    timer = setTimeout(() => resolve(false), timeoutMs)
  })
  try {
    return await Promise.race([
      promise.then(
        (value) => value === true,
        () => false,
      ),
      guard,
    ])
  } finally {
    if (timer) clearTimeout(timer)
  }
}

export const evaluateAccess = async (
  access: Access | undefined,
  opts: { locale?: string; timeoutMs?: number; baseAccess?: SanitizedConfig['baseAccess'] } = {},
): Promise<boolean> => {
  if (!access) return false
  const { locale, timeoutMs = 250, baseAccess } = opts
  const trap = <T extends object>(allowed: PropertyKey, value: unknown): T =>
    new Proxy({} as T, {
      get(_target, key) {
        if (key === allowed) return value
        throw new Error('req.payload accessed during build')
      },
    })
  const payloadTrap = trap('config', trap('baseAccess', baseAccess))
  const req = { user: null, headers: new Headers(), context: {}, locale, payload: payloadTrap }
  try {
    const result = access({ req } as never)
    if (result && typeof (result as Promise<unknown>).then === 'function') {
      return await withTimeout(result as Promise<unknown>, timeoutMs)
    }
    return result === true
  } catch {
    return false
  }
}

export const readSecurityOverride = (entity: {
  slug: string
  custom?: { openapi?: { security?: unknown } }
}): EntitySecurityOverride | undefined => {
  const meta = entity.custom?.openapi?.security
  const values = isPlainObject(meta) ? Object.values(meta) : [meta]
  if (values.some((value) => typeof value === 'boolean')) {
    throw new Error(
      `[${PLUGIN_NAME}] custom.openapi.security true/false on "${entity.slug}" was removed, use 'public' or 'secured'`,
    )
  }
  return meta === undefined ? undefined : (meta as EntitySecurityOverride)
}

const overrideFor = (override: EntitySecurityOverride | undefined, op: ProbedOperation): boolean | undefined => {
  const fallback = OVERRIDE_FALLBACK[op]
  const marking =
    typeof override === 'string'
      ? override
      : (override?.[op as EntityOperation] ?? (fallback ? override?.[fallback] : undefined))
  return marking === undefined ? undefined : marking === 'public'
}

export const resolveEntitySecurity = async ({
  entity,
  operations,
  locale,
  baseAccess,
}: {
  entity: Entity
  operations: ProbedOperation[]
  locale?: string
  baseAccess?: SanitizedConfig['baseAccess']
}): Promise<EntitySecurity> => {
  const override = readSecurityOverride(entity)
  const access = entity.access as Partial<Record<ProbedOperation, Access>> | undefined
  const out: EntitySecurity = {}
  for (const op of operations) {
    const declared = overrideFor(override, op)
    const isPublic = declared ?? (await evaluateAccess(access?.[op], { locale, baseAccess }))
    out[op] = isPublic ? undefined : securedRequirement()
  }
  return out
}

const withLogin = (security: SecurityRequirementObject[]): SecurityRequirementObject[] =>
  security.some((r) => SECURITY_SCHEME_NAME in r) && !security.some((r) => INTERACTIVE_SCHEME_NAME in r)
    ? [...security, { [INTERACTIVE_SCHEME_NAME]: [] }]
    : security

export const applySecurity = async ({
  paths,
  slug,
  kind,
  plugin,
  security,
  login = false,
}: {
  paths: PathsObject
  slug?: string
  kind: OperationKind
  plugin?: string
  security?: SecurityOption
  login?: boolean
}): Promise<PathsObject> => {
  if (!security && !login) return paths
  for (const [path, item] of Object.entries(paths)) {
    if (!item) continue
    const ops = item as Record<HttpMethod, { security?: SecurityRequirementObject[] } | undefined>
    for (const method of HTTP_METHODS) {
      const op = ops[method]
      if (!op) continue
      if (login && op.security) op.security = withLogin(op.security)
      if (!security) continue
      const detected = op.security?.length ? 'secured' : 'public'
      const decision = await security({ method, path, slug, kind, plugin: operationPlugin(op, plugin), detected })
      if (decision === 'public') delete op.security
      else if (decision === 'secured') op.security = securedRequirement(login)
      else if (Array.isArray(decision)) op.security = decision
    }
  }
  return paths
}
