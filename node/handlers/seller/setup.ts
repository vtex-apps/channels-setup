import { json } from 'co-body'

import Itself from '../../clients/itself'
import { updateSchema, validateRequest } from '../../utils/channelRequest'
import { CHANNEL_REQUESTS_ENTITY } from '../../utils/constants'
import { extractSettings } from '../../utils/extractSettings'

const extractAccount = (appId: string) => appId.split('.')[0]

export async function setup(ctx: Context) {
  await updateSchema(ctx)

  const { mkpAccount, salesChannels } = (await json(ctx.req)) as SetupReq

  const settings = extractSettings(ctx.vtex.settings).find(
    ({ appId }) => extractAccount(appId) === mkpAccount
  )

  if (!settings) {
    return
  }

  await validateRequest(ctx, mkpAccount, true)

  const request = {
    requested: mkpAccount,
    requester: ctx.vtex.account,
    salesChannels,
    settings,
    status: 'pending',
  } as ChannelRequest

  await new Itself({
    ...ctx.vtex,
    account: mkpAccount,
  }).mkpRequest(request)

  await ctx.clients.masterdata.createDocument({
    dataEntity: CHANNEL_REQUESTS_ENTITY,
    fields: request,
  })

  ctx.body = request
}

interface SetupReq {
  mkpAccount: string
  affiliateId: string
  salesChannels: SalesChannelMap
}
