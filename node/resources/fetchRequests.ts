import {
  CHANNEL_REQUESTS_ENTITY,
  CHANNEL_REQUESTS_SCHEMA,
} from '../utils/constants'

export const fetchRequests = async (as: string, ctx: Context) => {
  const isMarketplace = as === 'marketplace'

  return ctx.clients.masterdata.searchDocuments({
    dataEntity: CHANNEL_REQUESTS_ENTITY,
    fields: [
      'affiliateId',
      'salesChannels',
      'settings',
      'status',
      `${isMarketplace ? 'requester' : 'requested'}`,
    ],
    pagination: {
      page: 1,
      pageSize: 1,
    },
    schema: CHANNEL_REQUESTS_SCHEMA,
    where: `${isMarketplace ? 'requested' : 'requester'}=${ctx.vtex.account}`,
  })
}
