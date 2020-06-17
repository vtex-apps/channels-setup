import { InstanceOptions, IOContext } from '@vtex/api'

import VtexCommerce from './vtexCommerce'

const routes = {
  seller: (sellerId: string) => `/pvt/seller/${sellerId}`,
}

export default class Catalog extends VtexCommerce {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, 'catalog_system', options)
  }

  public createSeller({
    SellerId,
    Name,
    Email,
    Description = '',
    ExchangeReturnPolicy = '',
    DeliveryPolicy = '',
    UseHybridPaymentOptions,
    UserName = '',
    Password = '',
    SecutityPrivacyPolicy = '',
    CNPJ = '',
    CSCIdentification,
    ArchiveId = '',
    UrlLogo = '',
    ProductCommissionPercentage,
    FreightCommissionPercentage,
    FulfillmentEndpoint,
    CatalogSystemEndpoint,
    IsActive = true,
    FulfillmentSellerId = '',
    SellerType = 1,
    IsBetterScope = false,
  }: CatalogInput) {
    this.http.post(routes.seller(SellerId), {
      ArchiveId,
      CNPJ,
      CSCIdentification,
      CatalogSystemEndpoint,
      DeliveryPolicy,
      Description,
      Email,
      ExchangeReturnPolicy,
      FreightCommissionPercentage,
      FulfillmentEndpoint,
      FulfillmentSellerId,
      IsActive,
      IsBetterScope,
      Name,
      Password,
      ProductCommissionPercentage,
      SecutityPrivacyPolicy,
      SellerId,
      SellerType,
      UrlLogo,
      UseHybridPaymentOptions,
      UserName,
    })
  }
}

interface CatalogInput {
  SellerId: string
  Name: string
  Email: string
  Description?: string
  ExchangeReturnPolicy?: string
  DeliveryPolicy?: string
  UseHybridPaymentOptions: boolean
  UserName?: string
  Password?: string
  SecutityPrivacyPolicy?: string
  CNPJ?: string
  CSCIdentification: string
  ArchiveId?: string
  UrlLogo?: string
  ProductCommissionPercentage: number
  FreightCommissionPercentage: number
  FulfillmentEndpoint: string
  CatalogSystemEndpoint: string
  IsActive?: boolean
  FulfillmentSellerId?: string
  SellerType?: number
  IsBetterScope?: boolean
}
