import {useContext} from 'react'

import {AuthServiceContext} from '../context/auth-service.context'

export default function useAuthInterpreter() {
  const interpreter = useContext(AuthServiceContext)

  if (!interpreter) {
    throw Error('No interpreter.')
  }

  return interpreter
}
