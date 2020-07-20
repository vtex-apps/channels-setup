import React, { FC } from 'react'
import {
  EmptyState,
  Layout,
  PageBlock,
  PageHeader,
  ToastProvider,
} from 'vtex.styleguide'
import { useQuery } from 'react-apollo'

import getChannels from './graphql/getChannels.gql'
import Channel from './components/Channel'

const renderChannels = (channels: AppSettings[]) =>
  channels.map(channel => <Channel key={channel.appId} {...channel} />)

const Channels: FC = () => {
  const { data, loading } = useQuery(getChannels)

  if (loading) {
    return <p>Loading...</p>
  }

  const { channels } = data

  return (
    <ToastProvider positioning="window">
      <Layout pageHeader={<PageHeader title="Available Channels" />}>
        <PageBlock variation="full">
          {channels.length ? (
            <div className="flex flex-wrap">{renderChannels(channels)}</div>
          ) : (
            <div className="flex justify-center">
              <EmptyState title="No channels installed">
                <p>
                  Please install a channel app to be able to request connection
                </p>
              </EmptyState>
            </div>
          )}
        </PageBlock>
      </Layout>
    </ToastProvider>
  )
}

export default Channels
