import React, { FC } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { Button, Layout, PageBlock, PageHeader, Table } from 'vtex.styleguide'
import { useQuery, useMutation } from 'react-apollo'

import getRequests from './graphql/getRequests.gql'
import acceptRequestMutation from './graphql/acceptRequest.gql'

const TABLE_SCHEMA = {
  properties: {
    requester: {
      title: 'Requester',
    },
    salesChannel: {
      title: 'Sales Channel',
    },
    status: {
      title: 'Status',
      cellRenderer: function StatusCell({
        cellData: { status, onClick },
      }: StatusCellParams) {
        return status === 'pending' ? (
          <div className="ma2">
            <Button size="small" onClick={onClick}>
              Accept
            </Button>
          </div>
        ) : (
          <span className="green b">Connected</span>
        )
      },
    },
  },
}
const Channels: FC = () => {
  const { account } = useRuntime()

  const { data, loading } = useQuery<{ requests: ChannelRequest[] }>(
    getRequests,
    {
      variables: { requested: account },
    }
  )

  const [acceptRequest] = useMutation(acceptRequestMutation)

  if (loading || !data) {
    return <p>Loading...</p>
  }

  return (
    <Layout pageHeader={<PageHeader title="Connection Requests" />}>
      <PageBlock variation="full">
        <Table
          fullWidth
          dynamicRowHeight
          schema={TABLE_SCHEMA}
          items={data.requests.map(({ requester, salesChannels, status }) => ({
            requester,
            status: {
              status,
              onClick: () =>
                acceptRequest({ variables: { sellerAccount: requester } }),
            },
            salesChannel: salesChannels[0].mkp,
          }))}
          density="high"
        />
      </PageBlock>
    </Layout>
  )
}

interface StatusCellParams {
  cellData: {
    status: string
    onClick: () => void
  }
}
export default Channels
