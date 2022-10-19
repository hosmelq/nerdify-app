import {Stack, useLink} from 'expo-router'
import {useEffect} from 'react'

import {HeaderBackButton} from '@react-navigation/elements'
import {useSelector} from '@xstate/react'

import {StyledText, StyledView} from '../../../components/styles'
import useAuthInterpreter from '../../../hooks/use-auth-interpreter.hook'

export default function Waiting() {
  const link = useLink()
  const service = useAuthInterpreter()
  const email = useSelector(service, (state) => state.context.email)

  useEffect(() => {
    service.onTransition((state) => {
      if (state.matches('signedOut.timeuot')) {
        link.back()
      }
    })
  }, [link, service])

  return (
    <>
      <Stack.Screen
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <HeaderBackButton
              onPress={() => {
                service.send({
                  type: 'SIGN_IN_WITH_EMAIL_CANCEL',
                })
                link.back()
              }}
            />
          ),
        }}
      />
      <StyledView classes={['flex:1', 'justify:center']}>
        <StyledText
          classes={['font-weight:medium', 'text:5xl', 'text-align:center']}
        >
          Check your email
        </StyledText>
        <StyledText classes={['mt:4', 'text-align:center']}>
          Tap the link in the email we've sent to
        </StyledText>
        <StyledText classes={['font-weight:bold', 'text-align:center']}>
          {email}
        </StyledText>
      </StyledView>
    </>
  )
}
