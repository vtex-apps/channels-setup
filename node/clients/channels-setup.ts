import { AppClient, InstanceOptions, IOContext } from '@vtex/api'

export default class ChannelsSetup extends AppClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super('vtex.channels-setup@0.x', ctx, {
      ...options,
      retries: 3,
      timeout: 20000,
    })
  }

  public async mkpRequest(channelRequest: ChannelRequest) {
    return this.http.post('marketplace/handshake', channelRequest)
  }

  public async notifyAccept(mkpAccount: string) {
    return this.http.post('seller/requests/accept', {
      mkpAccount,
    })
  }

  public async customSetup(mkpAccount: string) {
    return this.http.post('/seller/setup/custom', { mkpAccount })
  }
}
