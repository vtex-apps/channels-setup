import { AppClient, InstanceOptions, IOContext } from '@vtex/api'

export default class Itself extends AppClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super('vtex.channels-setup@0.x', ctx, options)
  }

  public async mkpRequest(channelRequest: ChannelRequest) {
    return this.http.post('_v/channels-setup/mkp/handshake', channelRequest)
  }

  public async notifyAccept() {
    return this.http.post('_v/channels-setup/seller/request/accept')
  }

  public async customSetup() {
    return this.http.post('_v/channels-setup/seller/customSetup')
  }
}
