import type {
  CacheConfig,
  RequestParameters,
  UploadableMap,
  Variables,
} from 'relay-runtime'

import {getHeaders, getRequestBody} from './helpers'

export default async function fetchFunction(
  operation: RequestParameters,
  variables: Variables,
  cacheConfig: CacheConfig,
  uploadables?: UploadableMap | null
) {
  const accessToken = '???'
  const headers = getHeaders(uploadables)

  // if (accessToken) {
  //   headers.Authorization = `Bearer ${session.accessToken}`
  // }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_GRAPHQL_URL}?environment=client&operation=${operation.name}`,
    {
      body: getRequestBody(operation, variables, uploadables),
      headers,
      method: 'POST',
    }
  )

  return response.json()
}
