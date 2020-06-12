import { InstanceOptions, IOContext, RequestTracingConfig } from '@vtex/api'

import { createTracing } from '../utils/tracing'
import VtexCommerce from './vtexCommerce'

export default class Affiliate extends VtexCommerce {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, 'fulfillment/pvt/affiliates', options)
  }

  public registerAffiliate(
    { name, id, salesChannelId, searchEndpoint }: AffiliateInput,
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'affiliate-registerAffiliate'
    return this.http.put(
      id,
      {
        followUpEmail: 'mock@mock.com',
        id,
        name,
        salesChannel: salesChannelId,
        searchURIEndPoint: searchEndpoint,
        searchURIEndPointAvailableVersions: ['1.x.x'],
        searchURIEndPointVersion: '1.x.x',
        useSellerPaymentMethod: false,
      },
      {
        metric,
        tracing: createTracing(metric, tracingConfig),
      }
    )
  }
}

interface AffiliateInput {
  name: string
  id: string
  salesChannelId: string
  searchEndpoint: string
}
