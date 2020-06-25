import React, { FC } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { Button, Card } from 'vtex.styleguide'

const CHANNEL_SETUP_PAGE = 'admin.app.channels-setup'

const getVendor = (appId: string) => appId.split('.')[0]

const Channel: FC<Props> = ({ appId, name, imageUrl }) => {
  const { navigate } = useRuntime()
  return (
    <div className="pa5" style={{ maxWidth: '18rem' }}>
      <Card>
        <div className="flex flex-column tc">
          <div>
            <h2>{name}</h2>
          </div>
          <div className="pb5">
            <img src={imageUrl} alt="test" />
          </div>
          <div className="pb5">
            <Button
              variation="primary"
              onClick={() =>
                navigate({
                  page: CHANNEL_SETUP_PAGE,
                  query: `id=${getVendor(appId)}`,
                })
              }
            >
              Connect
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

interface Props {
  appId: string
  name: string
  imageUrl: string
}

export default Channel
