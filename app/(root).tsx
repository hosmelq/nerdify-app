import {Layout, SplashScreen} from 'expo-router'
import {Suspense} from 'react'
import {StyleProvider} from 'react-native-zephyr'
import {RelayEnvironmentProvider} from 'react-relay'

import {useSelector} from '@xstate/react'

import AuthServiceProvider from '../context/auth-service.context'
import useAuthInterpreter from '../hooks/use-auth-interpreter.hook'
import relayEnvironment from '../relay/environment'

export default function Root() {
  return (
    <AuthServiceProvider>
      <RootLayout />
    </AuthServiceProvider>
  )
}

function RootLayout() {
  const service = useAuthInterpreter()
  const isLoading = useSelector(service, (state) => state.hasTag('loading'))
  const viewer = useSelector(service, (state) => state.context.viewer)

  if (isLoading) {
    return <SplashScreen />
  }

  return (
    <StyleProvider>
      <RelayEnvironmentProvider environment={relayEnvironment}>
        <Layout>
          <Layout.Screen name="(app)" redirect={!viewer} />
          <Layout.Screen name="(auth)" redirect={!!viewer} />
          <Suspense fallback={null}>
            <Layout.Children />
          </Suspense>
        </Layout>
      </RelayEnvironmentProvider>
    </StyleProvider>
  )
}
