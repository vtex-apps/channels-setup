import { extractSettings } from '../utils/extractSettings'

export async function channels(ctx: Context) {
  ctx.body = extractSettings(
    ctx.vtex.settings
  ).map(({ appId, name, imageUrl }) => ({ appId, name, imageUrl }))
}
