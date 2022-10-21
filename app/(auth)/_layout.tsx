import {Stack} from 'expo-router'

import {StyledSafeAreaView, styles} from '../../components/styles'

export default function SignIn() {
  return (
    <StyledSafeAreaView classes={['flex:1', 'pt:0']}>
      <Stack
        screenOptions={{
          contentStyle: styles('bg:white'),
          headerShown: false,
        }}
      >
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="waiting" />
      </Stack>
    </StyledSafeAreaView>
  )
}
