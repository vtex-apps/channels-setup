import ChannelsSetup from '../clients/channels-setup'
import { updateSchema, validateRequest } from '../utils/channelRequest'
import { CHANNEL_REQUESTS_ENTITY } from '../utils/constants'
import { extractSettings } from '../utils/extractSettings'

const extractAccount = (appId: string) => appId.split('.')[0]

export const requestSetup = async (
  mkpAccount: string,
  salesChannels: SalesChannelMap[],
  ctx: Context
) => {
  await updateSchema(ctx)

  const settings = extractSettings(
    ctx.vtex.settings.dependenciesSettings ?? ctx.vtex.settings
  ).find(({ appId }) => extractAccount(appId) === mkpAccount)

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

  await new ChannelsSetup({
    ...ctx.vtex,
    account: mkpAccount,
  }).mkpRequest(request)

  await ctx.clients.masterdata.createDocument({
    dataEntity: CHANNEL_REQUESTS_ENTITY,
    fields: request,
  })

  return request
}
