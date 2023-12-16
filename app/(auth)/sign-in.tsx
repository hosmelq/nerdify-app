import {useLink} from 'expo-router'
import {FastField, Formik, FormikConsumer, type FormikProps} from 'formik'
import {useEffect, useRef} from 'react'
import {Platform, Pressable, StyleSheet} from 'react-native'
import * as yup from 'yup'

import {useSelector} from '@xstate/react'

import {StyledText, StyledTextInput, StyledView} from '../../components/styles'
import useAuthInterpreter from '../../hooks/use-auth-interpreter.hook'

interface FormValues {
  email: string
}

const validationSchema = yup.object({
  email: yup.string().required().email().label('Email'),
})

export default function SignIn() {
  const formikRef = useRef<FormikProps<FormValues>>(null)
  const link = useLink()
  const service = useAuthInterpreter()
  const errors = useSelector(service, (state) => state.context.graphql.errors)
  const isInitiating = useSelector(service, (state) =>
    state.matches('signInWithEmail.initiate')
  )

  useEffect(() => {
    formikRef.current?.setErrors(errors)
  }, [errors])

  useEffect(() => {
    service.onTransition((state) => {
      if (state.matches('signInWithEmail.complete')) {
        link.push({
          pathname: 'waiting',
        })
      }
    })
  }, [link, service])

  return (
    <Formik<FormValues>
      initialValues={{
        email: '',
      }}
      innerRef={formikRef}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <StyledView classes={['pt:2', 'px:4']}>
        <StyledText classes={['font-weight:medium', 'text:3xl']}>
          Enter an email to get started
        </StyledText>
        <StyledText classes={['color:gray-700', 'mt:4']}>
          We'll send you an email to confirm it's you.
        </StyledText>
        <FastField name="email">
          {/* @ts-expect-error */}
          {({field, meta}) => (
            <>
              <StyledText classes={['mt:8']}>Email address</StyledText>
              <StyledTextInput
                autoCapitalize="none"
                autoComplete="email"
                autoFocus
                classes={[
                  'border:1',
                  'border-color:gray-500',
                  'mt:1',
                  'px:4',
                  'rounded:base',
                  Platform.OS === 'android' ? 'py:2' : 'py:4',
                ]}
                keyboardType="email-address"
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                style={styles.input}
                textContentType="emailAddress"
              />
              <StyledText classes={['color:red-500', 'h:4', 'mt:1']}>
                {meta.error}
              </StyledText>
            </>
          )}
        </FastField>
        <FormikConsumer>
          {({submitForm}) => (
            <Pressable
              android_ripple={{
                color: '#000',
              }}
              disabled={isInitiating}
              onPress={submitForm}
              style={({pressed}) => [
                {
                  ...Platform.select({
                    ios: {
                      opacity: pressed ? 0.75 : 1,
                    },
                  }),
                },
                styles.button,
                isInitiating && styles.buttonDisabled,
              ]}
            >
              <StyledText classes={['color:white']}>Next</StyledText>
            </Pressable>
          )}
        </FormikConsumer>
      </StyledView>
    </Formik>
  )

  function handleSubmit(values: FormValues) {
    service.send({
      email: values.email,
      type: 'SIGN_IN_WITH_EMAIL_INITIATE',
    })
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#313131',
    borderRadius: 4,
    height: 40,
    justifyContent: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  input: {
    fontSize: 16,
  },
})
