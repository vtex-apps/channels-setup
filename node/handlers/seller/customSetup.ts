import { json } from 'co-body'

import ConfigurationApp from '../../clients/configurationApp'
import { CHANNEL_REQUESTS_ENTITY } from '../../utils/constants'

export async function customSetup(ctx: Context) {
  const { mkpAccount } = await json(ctx.req)
  const [channelReq] = await ctx.clients.masterdata.searchDocuments<
    ChannelRequest
  >({
    dataEntity: CHANNEL_REQUESTS_ENTITY,
    fields: ['configurationApp'],
    pagination: {
      page: 1,
      pageSize: 1,
    },
    where: `requested=${mkpAccount}`,
  })

  const configAppClient = new ConfigurationApp(
    `${channelReq?.settings.appId}@0.x`, // TODO Fetch this info
    ctx.vtex,
    {
      retries: 5,
    }
  )

  ctx.body = await configAppClient.customSetup(channelReq)
  ctx.status = 200
}
