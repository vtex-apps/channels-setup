import { json } from 'co-body'

import ConfigurationApp from '../../clients/configurationApp'
import {
  CHANNEL_REQUESTS_ENTITY,
  CHANNEL_REQUESTS_SCHEMA,
} from '../../utils/constants'

export async function customSetup(ctx: Context) {
  const { mkpAccount } = await json(ctx.req)
  const [channelReq] = await ctx.clients.masterdata.searchDocuments<
    ChannelRequest
  >({
    dataEntity: CHANNEL_REQUESTS_ENTITY,
    fields: ['requester', 'requested', 'salesChannels', 'settings'],
    pagination: {
      page: 1,
      pageSize: 1,
    },
    schema: CHANNEL_REQUESTS_SCHEMA,
    where: `requested=${mkpAccount}`,
  })

  const configAppClient = new ConfigurationApp(
    `${channelReq?.settings.appId}`,
    ctx.vtex,
    {
      retries: 5,
    }
  )

  await configAppClient.customSetup(channelReq)

  ctx.body = 'Triggered custom setup'
  ctx.status = 200
}
