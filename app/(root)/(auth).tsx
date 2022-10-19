import {Stack} from 'expo-router'

import {StyledSafeAreaView} from '../../components/styles'

export default function SignIn() {
  return (
    <StyledSafeAreaView classes={['flex:1', 'pt:0']}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="waiting" />
      </Stack>
    </StyledSafeAreaView>
  )
}
