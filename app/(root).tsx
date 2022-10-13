import {Layout} from 'expo-router'
import {RelayEnvironmentProvider} from 'react-relay'

import relayEnvironment from '../relay/environment'

export default function Root() {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <Layout>
        <Layout.Screen name="(app)" />
        <Layout.Children />
      </Layout>
    </RelayEnvironmentProvider>
  )
}
