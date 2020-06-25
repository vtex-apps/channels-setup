import React, { FC } from 'react'

const Conditions: FC<Props> = ({ settings }) => {
  const conditions = Object.keys(settings).map(settingId => (
    <div key={settingId} className="t-small">
      <div className="bg-light-gray" style={{ height: '1px' }} />
      <div className="flex pv4">
        <div className="w-30 b">{settingId}</div>
        <div className="c-muted-2 w-70">
          {JSON.stringify(settings[settingId as keyof typeof settings])}
        </div>
      </div>
    </div>
  ))

  return (
    <div className="flex">
      <div className="w5 mr6 t-heading-4 b">Info</div>
      <div className="w-100">{conditions}</div>
    </div>
  )
}

interface Props {
  settings: SalesChannelSettings
}

export default Conditions
