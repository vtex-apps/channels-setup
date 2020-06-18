import { fetchChannels } from '../resources/fetchChannels'

export async function channels(ctx: Context) {
  ctx.body = await fetchChannels(ctx)
  ctx.status = 200
}
