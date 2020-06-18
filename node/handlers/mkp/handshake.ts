import { json } from 'co-body'

import { updateSchema, validateRequest } from '../../utils/channelRequest'
import { CHANNEL_REQUESTS_ENTITY } from '../../utils/constants'

export async function handshake(ctx: Context) {
  await updateSchema(ctx)

  const channelRequest: ChannelRequest = await json(ctx.req)

  await validateRequest(ctx, channelRequest.requester, false)

  await ctx.clients.masterdata.createDocument({
    dataEntity: CHANNEL_REQUESTS_ENTITY,
    fields: channelRequest,
  })

  ctx.body = 'ok'
  ctx.status = 200
}
