import {
  ClientsConfig,
  LRUCache,
  Service,
  ServiceContext,
  RecorderState,
  ParamsContext,
} from '@vtex/api'

import { Clients } from './clients'
import { setup } from './handlers/seller/setup'
import { channels } from './handlers/channels'
import { requests } from './handlers/requests'
import { handshake } from './handlers/mkp/handshake'
import { acceptRequest } from './handlers/mkp/acceptRequest'
import { acceptNotification } from './handlers/seller/acceptNotification'

const TIMEOUT_MS = 800

const memoryCache = new LRUCache<string, any>({ max: 5000 })
metrics.trackCache('status', memoryCache)

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
  routes: {
    acceptRequest,
    acceptNotification,
    channels,
    handshake,
    requests,
    setup,
  },
})
