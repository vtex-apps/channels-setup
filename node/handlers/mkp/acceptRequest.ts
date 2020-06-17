import { json } from 'co-body'

import Itself from '../../clients/itself'
import {
  CHANNEL_REQUESTS_ENTITY,
  CHANNEL_REQUESTS_SCHEMA,
} from '../../utils/constants'

type COMMISSION_TYPES = 'product' | 'freight'

const findMatchingSalesChannel = (
  salesChannelMap: SalesChannelMap,
  channelSettings: ChannelSettings
) =>
  channelSettings.salesChannels.find(
    salesChannelConfigs => salesChannelConfigs.id === salesChannelMap.mkp
  )

const findCommission = (
  commissionType: COMMISSION_TYPES,
  salesChannelSettings?: SalesChannelSettings
) => salesChannelSettings?.commissioning[commissionType] ?? 0

const formatFullfillmentUri = (
  salesChannelMap: SalesChannelMap,
  sellerAccount: string
) =>
  `http://fulfillment.vtexcommerce.com.br/api/fulfillment?affiliateid=${salesChannelMap.affiliateId}&sc=${salesChannelMap.seller}&an=${sellerAccount}`

export async function acceptRequest(ctx: Context) {
  const { sellerAccount } = await json(ctx.req)

  const {
    clients: { masterdata: Masterdata, catalog: Catalog },
  } = ctx

  const [sellerRequest] = await Masterdata.searchDocuments<ChannelRequest>({
    dataEntity: CHANNEL_REQUESTS_ENTITY,
    fields: ['id', 'salesChannels', 'settings'],
    pagination: {
      page: 1,
      pageSize: 1,
    },
    schema: CHANNEL_REQUESTS_SCHEMA,
    where: `requester=${sellerAccount}`,
  })

  const ItselfClient = new Itself({
    ...ctx.vtex,
    account: sellerAccount,
  })

  await ItselfClient.notifyAccept(ctx.vtex.account)

  Promise.all(
    sellerRequest.salesChannels.map(salesChannelMap => {
      const salesChannelSettings = findMatchingSalesChannel(
        salesChannelMap,
        sellerRequest.settings
      )

      return Catalog.createSeller({
        CSCIdentification: sellerAccount,
        CatalogSystemEndpoint: `http://${sellerAccount}.vtexcommercestable.com.br/api/catalog_system/`,
        Email: `${sellerAccount}@vtex.com`,
        FreightCommissionPercentage: findCommission(
          'freight',
          salesChannelSettings
        ),
        FulfillmentEndpoint: formatFullfillmentUri(
          salesChannelMap,
          sellerAccount
        ),
        Name: sellerAccount,
        ProductCommissionPercentage: findCommission(
          'product',
          salesChannelSettings
        ),
        SellerId: `${sellerAccount}${salesChannelMap.affiliateId}`.toLowerCase(),
        UseHybridPaymentOptions: salesChannelSettings?.payment === 'both',
      })
    })
  )

  await ItselfClient.customSetup(ctx.vtex.account)
  ctx.status = 200
  ctx.body = sellerRequest
}
