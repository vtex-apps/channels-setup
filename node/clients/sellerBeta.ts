import { InstanceOptions, IOContext } from '@vtex/api'

import VtexCommerce from './vtexCommerce'

export default class Seller extends VtexCommerce {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, 'seller-register', options)
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
    this.http.post('/pvt/seller', {
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
