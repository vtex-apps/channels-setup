import { NotFoundError } from '@vtex/api'

import ChannelsSetup from '../clients/channels-setup'
import {
  CHANNEL_REQUESTS_ENTITY,
  CHANNEL_REQUESTS_SCHEMA,
} from '../utils/constants'

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

export const acceptRequestResource = async (
  sellerAccount: string,
  ctx: Context
) => {
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

  if (!sellerRequest) {
    throw new NotFoundError('No such request')
  }

  const ChannelsSetupClient = new ChannelsSetup({
    ...ctx.vtex,
    account: sellerAccount,
  })

  await ChannelsSetupClient.notifyAccept(ctx.vtex.account)

  await Promise.all(
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

  await ChannelsSetupClient.customSetup(ctx.vtex.account)

  return sellerRequest
}
