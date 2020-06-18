import { InstanceOptions, IOContext, JanusClient } from '@vtex/api'

const routes = {
  base: () => `seller-register`,
  seller: () => `${routes.base}/pvt/seller`,
}

export default class Seller extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        VtexIdclientAutCookie: ctx.authToken,
        ...options?.headers,
      },
    })
  }

  public createSeller({
    id,
    name,
    fulfillmentEndpoint,
    account,
    isActive = true,
    taxCode = '',
    email = '',
    description = '',
    isBetterScope = false,
    sellerType = 1,
    CSCIdentification = '',
    channel = '',
    salesChannel = '',
    isVtex = true,
    score = 0,
    exchangeReturnPolicy = '',
    deliveryPolicy = '',
    securityPrivacyPolicy = null,
    fulfillmentSellerId = '',
  }: SellerInput) {
    this.http.post(routes.seller(), {
      CSCIdentification,
      account,
      channel,
      deliveryPolicy,
      description,
      email,
      exchangeReturnPolicy,
      fulfillmentEndpoint,
      fulfillmentSellerId,
      id,
      isActive,
      isBetterScope,
      isVtex,
      name,
      salesChannel,
      score,
      securityPrivacyPolicy,
      sellerType,
      taxCode,
    })
  }
}

interface SellerInput {
  id: string
  name: string
  isActive?: boolean
  fulfillmentEndpoint: string
  allowHybridPayments?: false
  taxCode?: string
  email?: string
  description?: string
  sellerCommissionConfiguration?: {
    productCommissionPercentage: number
    freightCommissionPercentage: number
    categoriesCommissionConfiguration: []
  }
  isBetterScope?: false
  sellerType?: 1
  availableSalesChannels?: AvailableSC[]
  CSCIdentification?: string
  account: string
  channel?: string
  salesChannel?: string
  isVtex?: true
  score?: number
  exchangeReturnPolicy?: string
  deliveryPolicy?: string
  securityPrivacyPolicy?: string | null
  fulfillmentSellerId?: string
}

interface AvailableSC {
  isSelected: true
  id: number
  name: string
}
