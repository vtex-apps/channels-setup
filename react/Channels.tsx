import React, { FC } from 'react'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'
import { useQuery } from 'react-apollo'

import getChannels from './graphql/channels.gql'
import Channel from './components/Channel'

const renderChannels = ({ channels }: { channels: AppSettings[] }) =>
  [
    ...channels,
    ...channels,
    ...channels,
    ...channels,
    ...channels,
  ].map(channel => <Channel key={channel.appId} {...channel} />)

const Channels: FC = () => {
  const { data: channelsRes, loading } = useQuery(getChannels)

  return (
    <Layout pageHeader={<PageHeader title="Available Channels" />}>
      <PageBlock variation="full">
        <div className="flex flex-wrap">
          {loading ? <p>Loading...</p> : renderChannels(channelsRes)}
        </div>
      </PageBlock>
    </Layout>
  )
}

export default Channels
