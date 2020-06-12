import { json } from 'co-body'

import { updateSchema, validateRequest } from '../../utils/channelRequest'
import { CHANNEL_REQUESTS_ENTITY } from '../../utils/constants'

export async function handshake(ctx: Context) {
  await updateSchema(ctx)

  const channelRequest = (await json(ctx.req)) as ChannelRequest

  await validateRequest(ctx, channelRequest.requester, false)

  await ctx.clients.masterdata.createDocument({
    dataEntity: CHANNEL_REQUESTS_ENTITY,
    fields: channelRequest,
  })

  ctx.body = 'ok'
  ctx.status = 200
}
