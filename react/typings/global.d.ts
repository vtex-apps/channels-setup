interface AppSettings extends ChannelSettings {
  appId: string
}

interface ChannelSettings {
  name: string
  imageUrl: string
  salesChannels: SalesChannelSettings[]
}

interface SalesChannelSettings {
  id: number
  name: string
  description: string
  commissioning: {
    product: number
    freight: number
  }
  payment: string
}

interface ChannelRequest {
  id?: string
  requester: string
  requested: string
  status: string
  salesChannels: SalesChannelMap[]
  settings: AppSettings
}

interface SalesChannelMap {
  affiliateId: string
  mkp: number
  seller: number
}
