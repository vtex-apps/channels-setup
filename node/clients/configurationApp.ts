import { AppClient } from '@vtex/api'

export default class ConfigurationApp extends AppClient {
  public async customSetup(sellerConfigs: any) {
    return this.http.post('/setup', sellerConfigs)
  }
}
