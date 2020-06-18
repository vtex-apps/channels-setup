import { fetchRequests } from '../../resources/fetchRequests'

export const requestsResolver = (
  _: unknown,
  { as }: RequestsParams,
  ctx: Context
) => fetchRequests(as, ctx)

interface RequestsParams {
  as: string
}
