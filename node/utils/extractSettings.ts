import { toPairs } from 'ramda'

const getAppId = (declarer: string) => {
  const [id, version] = declarer.split('@')

  const [major] = version.split('.')

  return `${id}@${major}.x`
}

export const extractSettings = (settings: Array<Record<string, any>>) => {
  return settings.map(appSettings =>
    toPairs(appSettings).reduce(
      (acc, [key, value]) =>
        key === 'declarer'
          ? {
              ...acc,
              appId: getAppId(value),
            }
          : {
              ...acc,
              ...value,
            },
      {} as AppSettings
    )
  )
}
