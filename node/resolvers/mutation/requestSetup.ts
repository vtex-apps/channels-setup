import { requestSetup as requestSetupResource } from '../../resources/requestSetup'

export const requestSetupResolver = (
  _: unknown,
  { mkpAccount, salesChannels }: RequestParams,
  ctx: Context
) => requestSetupResource(mkpAccount, salesChannels, ctx)

interface RequestParams {
  mkpAccount: string
  salesChannels: SalesChannelMap[]
}
