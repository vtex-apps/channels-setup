import React, { FC, useState } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { Box, Layout, PageHeader, Tabs, Tab } from 'vtex.styleguide'
import { useQuery } from 'react-apollo'

import SetupForm from './components/SetupForm'
import findChannel from './graphql/findChannel.gql'

const Setup: FC = () => {
  const {
    navigate,
    query: { id: vendor },
  } = useRuntime()

  const [state, setState] = useState<State>({
    salesChannel: 1,
  })

  const { data, loading } = useQuery<{ channels: AppSettings[] }>(findChannel, {
    variables: {
      vendor,
    },
  })

  if (loading || !data) {
    return <p>Loading...</p>
  }

  const {
    channels: [{ name: mkpName, salesChannels }],
  } = data

  return (
    <Layout
      pageHeader={
        <PageHeader
          title={mkpName}
          linkLabel="Go back to previous page"
          onLinkClick={() =>
            navigate({
              to: `/admin/app/channels-setup`,
            })
          }
        />
      }
    >
      <Box>
        <Tabs>
          {salesChannels.map(salesChannel => (
            <Tab
              key={salesChannel.id}
              label={salesChannel.name}
              active={state.salesChannel === salesChannel.id}
              onClick={() => setState({ salesChannel: salesChannel.id })}
            >
              <div className="ma8">
                <SetupForm settings={salesChannel} />
              </div>
            </Tab>
          ))}
        </Tabs>
      </Box>
    </Layout>
  )
}

interface State {
  salesChannel: number | null
}

export default Setup
