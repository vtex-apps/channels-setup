import { fetchChannels } from '../../resources/fetchChannels'

export const channelsResolver = (
  _: unknown,
  { vendor }: ChannelsParams,
  ctx: Context
) => fetchChannels(ctx, vendor)

interface ChannelsParams {
  vendor: string
}
