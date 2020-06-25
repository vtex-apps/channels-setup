import { fetchRequests } from '../../resources/fetchRequests'

export const requestsResolver = (
  _: unknown,
  { requested, requester }: RequestsParams,
  ctx: Context
) => fetchRequests(ctx, requested, requester)

interface RequestsParams {
  requested?: string
  requester?: string
}
