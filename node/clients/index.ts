import { IOClients } from '@vtex/api'

import Seller from './sellerBeta'
import Affiliate from './affiliate'
import Catalog from './catalog'

export class Clients extends IOClients {
  public get seller() {
    return this.getOrSet('seller', Seller)
  }

  public get affiliate() {
    return this.getOrSet('affiliate', Affiliate)
  }

  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }
}
