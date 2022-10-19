/* eslint relay/unused-fields: "off" */

import Constants from 'expo-constants'
import * as SecureStore from 'expo-secure-store'
import {commitMutation, graphql, fetchQuery} from 'react-relay'
import {createMachine, type InterpreterFrom} from 'xstate'

import {assign} from '@xstate/immer'

import type {auth_signInWithEmailComplete_Mutation} from '../__generated__/auth_signInWithEmailComplete_Mutation.graphql'
import type {auth_signInWithEmailInitiate_Mutation} from '../__generated__/auth_signInWithEmailInitiate_Mutation.graphql'
import type {auth_viewer_Query} from '../__generated__/auth_viewer_Query.graphql'
import {ACCESS_TOKEN_KEY} from '../constants'
import relayEnvironment from '../relay/environment'
import formatGraphQLErrors from '../utils/format-graphql-errors'

type AuthContext = {
  completionAttempts: number
  completionToken: string | null
  email: string | null
  graphql: ReturnType<typeof formatGraphQLErrors>
  viewer: auth_viewer_Query['response']['viewer'] | null
}

type AuthEvents =
  | {
      email: string
      type: 'SIGN_IN_WITH_EMAIL_INITIATE'
    }
  | {
      type: 'SIGN_IN_WITH_EMAIL_CANCEL'
    }

type AuthServices = {
  getAccessToken: {
    data: string | null
  }
  getViewer: {
    data: auth_viewer_Query['response'] | null
  }
  signInWithEmailComplete: {
    data:
      | {
          accessToken: string
          user: {
            email: string
            id: string
            name: string
          }
        }
      | ReturnType<typeof formatGraphQLErrors>
  }
  signInWithEmailInitiate: {
    data:
      | {
          completionToken: string
        }
      | ReturnType<typeof formatGraphQLErrors>
  }
}

export type AuthMachine = typeof machine

export type AuthInterpreter = InterpreterFrom<AuthMachine>

const MAX_COMPLETION_ATTEMPTS = 30

const machine = createMachine(
  {
    schema: {
      context: {} as AuthContext,
      events: {} as AuthEvents,
      services: {} as AuthServices,
    },
    tsTypes: {} as import('./auth.machine.typegen').Typegen0,
    context: {
      completionAttempts: 0,
      completionToken: null,
      email: null,
      graphql: {
        errors: {},
        messages: [],
      },
      viewer: null,
    },
    predictableActionArguments: true,
    id: 'auth',
    initial: 'starting',
    states: {
      starting: {
        invoke: {
          src: 'getAccessToken',
          onDone: [
            {
              target: 'validateAccessToken',
            },
          ],
          onError: [
            {
              target: 'signedOut',
            },
          ],
        },
        tags: 'loading',
      },
      validateAccessToken: {
        invoke: {
          src: 'getViewer',
          onDone: [
            {
              actions: 'saveViewer',
              target: 'signedIn',
            },
          ],
          onError: [
            {
              actions: 'removeLocalAccessToken',
              target: 'signedOut',
            },
          ],
        },
        tags: 'loading',
      },
      signInWithEmail: {
        initial: 'initiate',
        states: {
          initiate: {
            invoke: {
              src: 'signInWithEmailInitiate',
              onDone: [
                {
                  actions: 'saveCompletionToken',
                  target: 'complete',
                },
              ],
              onError: [
                {
                  actions: 'saveGraphQLErrors',
                  target: '#auth.signedOut.failed',
                },
              ],
            },
          },
          complete: {
            initial: 'waiting',
            on: {
              SIGN_IN_WITH_EMAIL_CANCEL: '#auth.signedOut.idle',
            },
            states: {
              checking: {
                invoke: {
                  src: 'signInWithEmailComplete',
                  onDone: [
                    {
                      actions: 'saveSession',
                      target: '#auth.signedIn',
                    },
                  ],
                  onError: [
                    {
                      actions: 'incrementCompletionAttempts',
                      cond: 'shouldRetryCompletion',
                      target: 'waiting',
                    },
                    {
                      actions: 'clearCompletionData',
                      target: '#auth.signedOut.timeuot',
                    },
                  ],
                },
              },
              waiting: {
                after: {
                  RETRY_COMPLETION_DELAY: {
                    target: '#auth.signInWithEmail.complete.checking',
                  },
                },
              },
            },
          },
        },
      },
      signedIn: {},
      signedOut: {
        initial: 'idle',
        states: {
          failed: {},
          idle: {},
          timeuot: {},
        },
        on: {
          SIGN_IN_WITH_EMAIL_INITIATE: {
            actions: 'saveEmail',
            target: '#auth.signInWithEmail.initiate',
          },
        },
      },
    },
  },
  {
    actions: {
      clearCompletionData: assign((ctx) => {
        ctx.completionAttempts = 0
        ctx.completionToken = null
      }),
      incrementCompletionAttempts: assign((ctx) => {
        ctx.completionAttempts++
      }),
      removeLocalAccessToken() {
        SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY)
      },
      saveCompletionToken: assign((ctx, {data}) => {
        if ('completionToken' in data) {
          ctx.completionToken = data.completionToken
        }
      }),
      saveEmail: assign((ctx, {email}) => {
        ctx.email = email
      }),
      saveGraphQLErrors: assign((ctx, {data}) => {
        ctx.graphql = data as ReturnType<typeof formatGraphQLErrors>
      }),
      saveSession: assign((ctx, {data}) => {
        if ('accessToken' in data && 'user' in data) {
          SecureStore.setItemAsync(ACCESS_TOKEN_KEY, data.accessToken)

          ctx.viewer = data.user
        }
      }),
      saveViewer: assign((ctx, {data}) => {
        ctx.viewer = data?.viewer ?? null
      }),
    },
    delays: {
      RETRY_COMPLETION_DELAY: ({completionAttempts}) => {
        if (completionAttempts < 10) {
          return 3000
        }

        return 5000
      },
    },
    guards: {
      shouldRetryCompletion(ctx) {
        return ctx.completionAttempts < MAX_COMPLETION_ATTEMPTS
      },
    },
    services: {
      async getAccessToken() {
        const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY)

        if (!accessToken) {
          throw new Error('No access token.')
        }

        return accessToken
      },
      async getViewer() {
        const data = await fetchQuery<auth_viewer_Query>(
          relayEnvironment,
          graphql`
            query auth_viewer_Query {
              viewer {
                email
                id
                name
              }
            }
          `,
          {}
        ).toPromise()

        return data ?? null
      },
      signInWithEmailComplete(ctx) {
        return new Promise((resolve, reject) => {
          commitMutation<auth_signInWithEmailComplete_Mutation>(
            relayEnvironment,
            {
              mutation: graphql`
                mutation auth_signInWithEmailComplete_Mutation(
                  $input: SignInWithEmailCompleteInput!
                ) {
                  signInWithEmailComplete(input: $input) {
                    accessToken
                    user {
                      email
                      id
                      name
                    }
                    userErrors {
                      field
                      message
                    }
                  }
                }
              `,
              variables: {
                input: {
                  email: ctx.email!,
                  verificationToken: ctx.completionToken!,
                },
              },
              onCompleted(response) {
                const {accessToken, user, userErrors} =
                  response.signInWithEmailComplete ?? {}

                if (userErrors && userErrors.length > 0) {
                  reject(formatGraphQLErrors(userErrors))
                }

                if (accessToken && user) {
                  resolve({accessToken, user})
                }
              },
              onError(error) {
                reject(error)
              },
            }
          )
        })
      },
      signInWithEmailInitiate(_, {email}) {
        return new Promise((resolve, reject) => {
          commitMutation<auth_signInWithEmailInitiate_Mutation>(
            relayEnvironment,
            {
              mutation: graphql`
                mutation auth_signInWithEmailInitiate_Mutation(
                  $input: SignInWithEmailInitiateInput!
                ) {
                  signInWithEmailInitiate(input: $input) {
                    completionToken
                    userErrors {
                      field
                      message
                    }
                  }
                }
              `,
              variables: {
                input: {
                  email,
                  tokenName: `Nerdify APP on ${Constants.deviceName} via Email`,
                },
              },
              onCompleted(response) {
                const {completionToken, userErrors} =
                  response.signInWithEmailInitiate ?? {}

                if (userErrors && userErrors.length > 0) {
                  reject(formatGraphQLErrors(userErrors))
                }

                if (completionToken) {
                  resolve({completionToken})
                }
              },
              onError() // error
              {
                // send to sentry
              },
            }
          )
        })
      },
    },
  }
)

export default machine
