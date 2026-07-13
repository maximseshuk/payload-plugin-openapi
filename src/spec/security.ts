import type { Access } from 'payload'
import type { PathsObject, SecurityRequirementObject } from '@scalar/openapi-types/3.2'

import type {
  Entity,
  EntityKind,
  EntityOperation,
  EntitySecurityOverride,
  HttpMethod,
  OperationContext,
} from '../types.js'
import { SECURITY_SCHEME_NAME } from './components.js'

const HTTP_METHODS: HttpMethod[] = ['get', 'post', 'patch', 'put', 'delete']

const securedRequirement = (): SecurityRequirementObject[] => [{ [SECURITY_SCHEME_NAME]: [] }]

export type EntitySecurity = Partial<Record<EntityOperation, SecurityRequirementObject[] | undefined>>

const withTimeout = async (promise: Promise<unknown>, timeoutMs: number): Promise<boolean> => {
  let timer: ReturnType<typeof setTimeout> | undefined
  const guard = new Promise<false>((resolve) => {
    timer = setTimeout(() => resolve(false), timeoutMs)
  })
  try {
    // Both handlers attached, so a rejected or never-settling fn leaks no unhandled rejection.
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

// Probe an access fn as an anonymous request: public only if it settles on `true`;
// a throw, a `Where`, a timeout, or a `req.payload` (DB) read all fall back to secured.
export const evaluateAccess = async (
  access: Access | undefined,
  opts: { locale?: string; timeoutMs?: number } = {},
): Promise<boolean> => {
  if (!access) return false
  const { locale, timeoutMs = 250 } = opts
  const payloadTrap = new Proxy(
    {},
    {
      get() {
        throw new Error('req.payload accessed during build')
      },
    },
  )
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

const readSecurityOverride = (entity: Entity): EntitySecurityOverride | undefined => {
  const meta = (entity as { custom?: { openapi?: { security?: unknown } } }).custom?.openapi?.security
  if (typeof meta === 'boolean') return meta
  if (meta && typeof meta === 'object') return meta as EntitySecurityOverride
  return undefined
}

const overrideFor = (override: EntitySecurityOverride | undefined, op: EntityOperation): boolean | undefined => {
  if (override === undefined) return undefined
  if (typeof override === 'boolean') return override
  return override[op]
}

export const resolveEntitySecurity = async ({
  entity,
  operations,
  locale,
}: {
  entity: Entity
  operations: EntityOperation[]
  locale?: string
}): Promise<EntitySecurity> => {
  const override = readSecurityOverride(entity)
  const access = entity.access as Partial<Record<EntityOperation, Access>> | undefined
  const out: EntitySecurity = {}
  for (const op of operations) {
    const declared = overrideFor(override, op)
    const isPublic = declared ?? (await evaluateAccess(access?.[op], { locale }))
    out[op] = isPublic ? undefined : securedRequirement()
  }
  return out
}

export const applySecurityWhen = ({
  paths,
  slug,
  kind,
  securityWhen,
}: {
  paths: PathsObject
  slug: string
  kind: EntityKind
  securityWhen?: (ctx: OperationContext) => boolean | undefined
}): PathsObject => {
  if (!securityWhen) return paths
  for (const [path, item] of Object.entries(paths)) {
    if (!item) continue
    const ops = item as Record<HttpMethod, { security?: SecurityRequirementObject[] } | undefined>
    for (const method of HTTP_METHODS) {
      const op = ops[method]
      if (!op) continue
      const decision = securityWhen({ method, path, slug, kind })
      if (decision === true) delete op.security
      else if (decision === false) op.security = securedRequirement()
    }
  }
  return paths
}
