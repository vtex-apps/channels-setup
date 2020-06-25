import { fetchRequests } from '../resources/fetchRequests'

export async function requests(ctx: Context) {
  const { requested, requester }: QueryParams = ctx.query

  ctx.body = await fetchRequests(ctx, requested, requester)
  ctx.status = 200
}

interface QueryParams {
  requested?: string
  requester?: string
}
