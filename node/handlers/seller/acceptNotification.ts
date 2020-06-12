import { NotFoundError } from '@vtex/api'
import { json } from 'co-body'

import { CHANNEL_REQUESTS_ENTITY } from '../../utils/constants'

const formatSearchEndpointUri = (mkpAccount: string, sellerAccount: string) =>
  `http://productnotification.vtexcommerce.com.br/api/notification/${mkpAccount}/${sellerAccount}`

export async function acceptNotification(ctx: Context) {
  const { mkpAccount } = await json(ctx.req)
  const {
    clients: { affiliate: Affiliate, masterdata: Masterdata },
    vtex: { account: sellerAccount },
  } = ctx

  const [{ id, salesChannels, settings }] = (await Masterdata.searchDocuments<
    ChannelRequest
  >({
    dataEntity: CHANNEL_REQUESTS_ENTITY,
    fields: ['salesChannels', 'settings', 'id'],
    pagination: {
      page: 1,
      pageSize: 1,
    },
    where: `requested=${mkpAccount}`,
  })) || [{}]

  if (!id) {
    throw new NotFoundError('No request found for this marketplace')
  }

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
