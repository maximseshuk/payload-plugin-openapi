import type { Endpoint } from 'payload'

type InteractiveAuthHandler = (authCollectionSlug: string) => Endpoint['handler']

export const interactiveAuthHandler: InteractiveAuthHandler = (authCollectionSlug) => async (req) => {
  const form = await req.formData?.()
  const username = form?.get('username')?.toString() ?? ''
  const password = form?.get('password')?.toString() ?? ''

  try {
    const result = await req.payload.login({
      collection: authCollectionSlug,
      data: { email: username, username, password } as never,
    })
    return Response.json({
      access_token: result.token,
      token_type: 'JWT',
      expires_in: result.exp === undefined ? undefined : result.exp - Math.floor(Date.now() / 1000),
    })
  } catch {
    return Response.json({ error: 'invalid_grant' }, { status: 400 })
  }
}
