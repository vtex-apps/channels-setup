import { fetchChannels } from '../resources/fetchChannels'

export async function channels(ctx: Context) {
  const {
    vtex: {
      route: {
        params: { vendor },
      },
    },
  } = ctx
  ctx.body = await fetchChannels(ctx, vendor as string)
  ctx.status = 200
}
