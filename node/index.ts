import {
  ClientsConfig,
  ParamsContext,
  RecorderState,
  Service,
  ServiceContext,
} from '@vtex/api'

import { Clients } from './clients'
import { channels } from './handlers/channels'
import { acceptRequest } from './handlers/mkp/acceptRequest'
import { handshake } from './handlers/mkp/handshake'
import { requests } from './handlers/requests'
import { acceptNotification } from './handlers/seller/acceptNotification'
import { customSetup } from './handlers/seller/customSetup'
import { setup } from './handlers/seller/setup'
import { acceptRequestResolver } from './resolvers/mutation/acceptRequest'
import { requestSetupResolver } from './resolvers/mutation/requestSetup'
import { channelsResolver } from './resolvers/query/channels'
import { requestsResolver } from './resolvers/query/requests'

const TIMEOUT_MS = 20000

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients>
}

export default new Service<Clients, RecorderState, ParamsContext>({
  clients,
  graphql: {
    resolvers: {
      Mutation: {
        acceptRequest: acceptRequestResolver,
        requestSetup: requestSetupResolver,
      },
      Query: {
        channels: channelsResolver,
        requests: requestsResolver,
      },
    },
  },
  routes: {
    acceptNotification,
    acceptRequest,
    channels,
    customSetup,
    handshake,
    requests,
    setup,
  },
})
