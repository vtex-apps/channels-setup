import React, { FC, useState } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { useMutation } from 'react-apollo'
import { Button, Input, Spinner } from 'vtex.styleguide'

import Conditions from './Conditions'
import requestSetupMutation from '../graphql/requestSetup.gql'
import { showToast } from '../utils/toast'

const getAffiliateName = (accountName: string, currency: string) =>
  currency.slice(0, 1) +
  accountName
    .replace(/a|e|i|o|u|-/g, '')
    .slice(0, 2)
    .toUpperCase()

const SetupForm: FC<Props> = ({ settings }) => {
  const {
    query: { id: vendor },
  } = useRuntime()

  const [{ affiliateId, salesChannel }, setState] = useState({
    affiliateId: getAffiliateName(vendor, settings.name),
    salesChannel: 1,
  })

  const [requestSetup, { loading }] = useMutation(requestSetupMutation, {
    onError: err => showToast(err.message),
    onCompleted: _ => showToast('Request sent'),
  })

  return (
    <div>
      <Conditions settings={settings} />
      <div className="flex mt5 flex-wrap">
        <div className="w-50 pr5">
          <Input
            value={affiliateId}
            onChange={(e: any) =>
              setState({ salesChannel, affiliateId: e.target.value })
            }
            label="Affiliate ID"
          />
        </div>
        <div className="w-50">
          <Input
            defaultValue={salesChannel}
            onChange={(e: any) =>
              setState({
                salesChannel: Number(e.target.value),
                affiliateId,
              })
            }
            label="Sales Channel"
          />
        </div>
      </div>
      <div className="mt5 tr">
        <Button
          variation="primary"
          type="submit"
          onClick={() =>
            requestSetup({
              variables: {
                mkpAccount: vendor,
                salesChannels: [
                  { affiliateId, mkp: settings.id, seller: salesChannel },
                ],
              },
            })
          }
        >
          {loading ? <Spinner size={20} color="white" /> : 'Request Connection'}
        </Button>
      </div>
    </div>
  )
}

interface Props {
  settings: SalesChannelSettings
}

export default SetupForm
