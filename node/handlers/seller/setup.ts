import { json } from 'co-body'

import { requestSetup } from '../../resources/requestSetup'

export async function setup(ctx: Context) {
  const { mkpAccount, salesChannels } = (await json(ctx.req)) as SetupReq

  ctx.body = await requestSetup(mkpAccount, salesChannels, ctx)
}

interface SetupReq {
  mkpAccount: string
  affiliateId: string
  salesChannels: SalesChannelMap[]
}
