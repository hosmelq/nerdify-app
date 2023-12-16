import {createContext, type ReactNode} from 'react'

import {useInterpret} from '@xstate/react'

import machine, {type AuthInterpreter} from '../machines/auth.machine'

interface AuthServiceProviderProps {
  children: ReactNode
}

export const AuthServiceContext = createContext<AuthInterpreter>(
  {} as AuthInterpreter
)

export default function AuthServiceProvider({
  children,
}: AuthServiceProviderProps) {
  const interpreter = useInterpret(machine).start()

  return (
    <AuthServiceContext.Provider value={interpreter}>
      {children}
    </AuthServiceContext.Provider>
  )
}
