import { extractSettings } from '../utils/extractSettings'

export const fetchChannels = (ctx: Context) =>
  extractSettings(
    ctx.vtex.settings.dependenciesSettings || ctx.vtex.settings
  ).map(({ appId, name, imageUrl }) => ({
    appId,
    imageUrl,
    name,
  }))
