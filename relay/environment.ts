import {Environment, Network, RecordSource, Store} from 'relay-runtime'

import fetchFunction from './fetch-function'

export function createClientNetwork() {
  return Network.create(fetchFunction)
}

export default new Environment({
  isServer: false,
  network: createClientNetwork(),
  store: new Store(new RecordSource(), {
    gcReleaseBufferSize: 25,
  }),
})
