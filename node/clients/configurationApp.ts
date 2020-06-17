import { AppClient } from '@vtex/api'

export default class ConfigurationApp extends AppClient {
  public async customSetup(channelRequest: ChannelRequest) {
    return this.http.post('setup', channelRequest)
  }
}
