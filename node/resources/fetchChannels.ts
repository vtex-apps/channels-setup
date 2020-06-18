import { extractSettings } from '../utils/extractSettings'

export const fetchChannels = (ctx: Context) =>
  extractSettings(ctx.vtex.settings.dependenciesSettings).map(
    ({ appId, name, imageUrl }) => ({
      appId,
      imageUrl,
      name,
    })
  )
