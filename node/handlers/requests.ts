import { fetchRequests } from '../resources/fetchRequests'

export async function requests(ctx: Context) {
  const { as } = ctx.query as { as: 'marketplace' | 'seller' }

  ctx.body = await fetchRequests(as, ctx)
  ctx.status = 200
}
