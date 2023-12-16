import * as SecureStore from 'expo-secure-store'
import type {
  CacheConfig,
  RequestParameters,
  UploadableMap,
  Variables,
} from 'relay-runtime'

import {ACCESS_TOKEN_KEY} from '../constants'
import {getHeaders, getRequestBody} from './helpers'

export default async function fetchFunction(
  operation: RequestParameters,
  variables: Variables,
  cacheConfig: CacheConfig,
  uploadables?: UploadableMap | null
) {
  const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY)
  const headers = getHeaders(uploadables)

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  const response = await fetch(
    `${process.env.GRAPHQL_URL}?environment=app&operation=${operation.name}`,
    {
      body: getRequestBody(operation, variables),
      headers,
      method: 'POST',
    }
  )

  return response.json()
}
