// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true
  internalEvents: {
    'done.invoke.auth.signInWithEmail.complete.checking:invocation[0]': {
      type: 'done.invoke.auth.signInWithEmail.complete.checking:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'done.invoke.auth.signInWithEmail.initiate:invocation[0]': {
      type: 'done.invoke.auth.signInWithEmail.initiate:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'done.invoke.auth.starting:invocation[0]': {
      type: 'done.invoke.auth.starting:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'done.invoke.auth.validateAccessToken:invocation[0]': {
      type: 'done.invoke.auth.validateAccessToken:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'error.platform.auth.signInWithEmail.complete.checking:invocation[0]': {
      type: 'error.platform.auth.signInWithEmail.complete.checking:invocation[0]'
      data: unknown
    }
    'error.platform.auth.signInWithEmail.initiate:invocation[0]': {
      type: 'error.platform.auth.signInWithEmail.initiate:invocation[0]'
      data: unknown
    }
    'error.platform.auth.validateAccessToken:invocation[0]': {
      type: 'error.platform.auth.validateAccessToken:invocation[0]'
      data: unknown
    }
    'xstate.after(RETRY_COMPLETION_DELAY)#auth.signInWithEmail.complete.waiting': {
      type: 'xstate.after(RETRY_COMPLETION_DELAY)#auth.signInWithEmail.complete.waiting'
    }
    'xstate.init': {type: 'xstate.init'}
  }
  invokeSrcNameMap: {
    getAccessToken: 'done.invoke.auth.starting:invocation[0]'
    getViewer: 'done.invoke.auth.validateAccessToken:invocation[0]'
    signInWithEmailComplete: 'done.invoke.auth.signInWithEmail.complete.checking:invocation[0]'
    signInWithEmailInitiate: 'done.invoke.auth.signInWithEmail.initiate:invocation[0]'
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    clearCompletionData: 'error.platform.auth.signInWithEmail.complete.checking:invocation[0]'
    incrementCompletionAttempts: 'error.platform.auth.signInWithEmail.complete.checking:invocation[0]'
    removeLocalAccessToken: 'error.platform.auth.validateAccessToken:invocation[0]'
    saveCompletionToken: 'done.invoke.auth.signInWithEmail.initiate:invocation[0]'
    saveEmail: 'SIGN_IN_WITH_EMAIL_INITIATE'
    saveGraphQLErrors: 'error.platform.auth.signInWithEmail.initiate:invocation[0]'
    saveSession: 'done.invoke.auth.signInWithEmail.complete.checking:invocation[0]'
    saveViewer: 'done.invoke.auth.validateAccessToken:invocation[0]'
  }
  eventsCausingServices: {
    getAccessToken: 'xstate.init'
    getViewer: 'done.invoke.auth.starting:invocation[0]'
    signInWithEmailComplete: 'xstate.after(RETRY_COMPLETION_DELAY)#auth.signInWithEmail.complete.waiting'
    signInWithEmailInitiate: 'SIGN_IN_WITH_EMAIL_INITIATE'
  }
  eventsCausingGuards: {
    shouldRetryCompletion: 'error.platform.auth.signInWithEmail.complete.checking:invocation[0]'
  }
  eventsCausingDelays: {
    RETRY_COMPLETION_DELAY:
      | 'done.invoke.auth.signInWithEmail.initiate:invocation[0]'
      | 'error.platform.auth.signInWithEmail.complete.checking:invocation[0]'
  }
  matchesStates:
    | 'signInWithEmail'
    | 'signInWithEmail.complete'
    | 'signInWithEmail.complete.checking'
    | 'signInWithEmail.complete.waiting'
    | 'signInWithEmail.initiate'
    | 'signedIn'
    | 'signedOut'
    | 'signedOut.failed'
    | 'signedOut.idle'
    | 'signedOut.timeout'
    | 'starting'
    | 'validateAccessToken'
    | {
        signInWithEmail?:
          | 'complete'
          | 'initiate'
          | {complete?: 'checking' | 'waiting'}
        signedOut?: 'failed' | 'idle' | 'timeout'
      }
  tags: 'loading'
}
