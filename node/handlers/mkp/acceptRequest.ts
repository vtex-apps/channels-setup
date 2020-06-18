import { json } from 'co-body'

import { acceptRequestResource } from '../../resources/acceptRequest'

export async function acceptRequest(ctx: Context) {
  const { sellerAccount } = await json(ctx.req)

  ctx.status = 200
  ctx.body = await acceptRequestResource(sellerAccount, ctx)
}
