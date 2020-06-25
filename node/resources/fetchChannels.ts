import { extractSettings } from '../utils/extractSettings'

const getVendor = (appId: string) => appId.split('.')[0]

export const fetchChannels = (ctx: Context, vendor?: string) => {
  const settings = extractSettings(
    ctx.vtex.settings.dependenciesSettings || ctx.vtex.settings
  ).map(({ appId, name, imageUrl, salesChannels }) => ({
    appId,
    imageUrl,
    name,
    salesChannels,
  }))

  return vendor
    ? settings.filter(({ appId }) => getVendor(appId) === vendor)
    : settings
}
