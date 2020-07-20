import React, { FC } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import {
  Button,
  Layout,
  PageBlock,
  PageHeader,
  Spinner,
  Table,
  ToastProvider,
} from 'vtex.styleguide'
import { useQuery, useMutation } from 'react-apollo'

import getRequests from './graphql/getRequests.gql'
import acceptRequestMutation from './graphql/acceptRequest.gql'
import { showToast } from './utils/toast'

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
        cellData: { loading, status, onClick },
      }: StatusCellParams) {
        return status === 'pending' ? (
          <div className="ma2">
            <Button size="small" onClick={onClick}>
              {loading ? <Spinner size={16} color="white" /> : 'Accept'}
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

  const { data, loading: queryLoading } = useQuery<{
    requests: ChannelRequest[]
  }>(getRequests, {
    variables: { requested: account },
  })

  const [acceptRequest, { loading: mutationLoading }] = useMutation(
    acceptRequestMutation,
    {
      onError: err => showToast(err.message),
      onCompleted: _ =>
        showToast('Connection request accepted. Running setup.'),
    }
  )

  if (queryLoading || !data) {
    return <p>Loading...</p>
  }

  return (
    <ToastProvider positioning="window">
      <Layout pageHeader={<PageHeader title="Connection Requests" />}>
        <PageBlock variation="full">
          <Table
            fullWidth
            dynamicRowHeight
            schema={TABLE_SCHEMA}
            items={data.requests.map(
              ({ requester, salesChannels, status }) => ({
                requester,
                status: {
                  loading: mutationLoading,
                  status,
                  onClick: () =>
                    acceptRequest({ variables: { sellerAccount: requester } }),
                },
                salesChannel: salesChannels[0].mkp,
              })
            )}
            density="high"
          />
        </PageBlock>
      </Layout>
    </ToastProvider>
  )
}

interface StatusCellParams {
  cellData: {
    loading: boolean
    status: string
    onClick: () => void
  }
}
export default Channels
