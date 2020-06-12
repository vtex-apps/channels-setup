import { toPairs } from 'ramda'

export const extractSettings = (
  settings: Array<Record<string, ChannelSettings>>
) =>
  settings.map(appSettings =>
    toPairs(appSettings).reduce(
      (acc, [key, value]) =>
        key === 'declarer'
          ? acc
          : {
              appId: key,
              ...value,
            },
      {} as AppSettings
    )
  )
