import { NotFoundError } from '@vtex/api'
import { json } from 'co-body'

import {
  CHANNEL_REQUESTS_ENTITY,
  CHANNEL_REQUESTS_SCHEMA,
} from '../../utils/constants'

const formatSearchEndpointUri = (mkpAccount: string, sellerAccount: string) =>
  `http://productnotification.vtexcommerce.com.br/api/notification/${mkpAccount}/${sellerAccount}`

export async function acceptNotification(ctx: Context) {
  const { mkpAccount } = await json(ctx.req)
  const {
    clients: { affiliate: Affiliate, masterdata: Masterdata },
    vtex: { account: sellerAccount },
  } = ctx

  const [channelRequest] = await Masterdata.searchDocuments<ChannelRequestDoc>({
    dataEntity: CHANNEL_REQUESTS_ENTITY,
    fields: ['salesChannels', 'settings', 'id'],
    pagination: {
      page: 1,
      pageSize: 1,
    },
    schema: CHANNEL_REQUESTS_SCHEMA,
    where: `requested=${mkpAccount}`,
  })

  if (!channelRequest) {
    throw new NotFoundError('No request found for this marketplace')
  }

  const { id, salesChannels, settings } = channelRequest

  const affiliates = await Promise.all(
    salesChannels.map(salesChannel =>
      Affiliate.registerAffiliate({
        id: salesChannel.affiliateId,
        name: settings.salesChannels.find(
          ({ id: mkpScId }) => mkpScId === salesChannel.mkp
        )?.name as string,
        salesChannelId: salesChannel.seller.toString(),
        searchEndpoint: formatSearchEndpointUri(mkpAccount, sellerAccount),
      })
    )
  )

  await Masterdata.updatePartialDocument({
    dataEntity: CHANNEL_REQUESTS_ENTITY,
    fields: {
      status: 'ready',
    },
    id,
  })

  ctx.status = 200
  ctx.body = affiliates
}
