import { fetchChannels } from '../../resources/fetchChannels'

export const channelsResolver = (_: unknown, __: unknown, ctx: Context) =>
  fetchChannels(ctx)
