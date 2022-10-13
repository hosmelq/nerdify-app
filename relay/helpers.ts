import {
  type RequestParameters,
  type UploadableMap,
  type Variables,
} from 'relay-runtime'

function getRequestBodyWithoutUplodables(
  operation: RequestParameters,
  variables: Variables
) {
  return JSON.stringify({
    query: operation.text,
    variables,
  })
}

export function getRequestBody(
  operation: RequestParameters,
  variables: Variables
) {
  return getRequestBodyWithoutUplodables(operation, variables)
}

export function getHeaders(uploadables?: UploadableMap | null): {
  [key: string]: string
} {
  if (uploadables && Object.keys(uploadables).length > 0) {
    return {
      Accept: 'application/json',
    }
  }

  return {
    Accept: 'application/json',
    'Content-type': 'application/json',
  }
}
