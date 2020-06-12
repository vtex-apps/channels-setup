import {
  CHANNEL_REQUESTS_ENTITY,
  CHANNEL_REQUESTS_SCHEMA,
} from '../utils/constants'

export async function requests(ctx: Context) {
  const { as } = ctx.query as { as: 'marketplace' | 'seller' }
  const isMarketplace = as === 'marketplace'

  ctx.body = await ctx.clients.masterdata.searchDocuments({
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
  ctx.status = 200
}
