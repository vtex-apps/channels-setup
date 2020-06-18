import { acceptRequestResource } from '../../resources/acceptRequest'

export const acceptRequestResolver = (
  _: unknown,
  { sellerAccount }: AcceptParams,
  ctx: Context
) => acceptRequestResource(sellerAccount, ctx)

interface AcceptParams {
  sellerAccount: string
}
