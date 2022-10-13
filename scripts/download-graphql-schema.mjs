import fs from 'node:fs'
import path from 'node:path'

import {buildClientSchema, getIntrospectionQuery, printSchema} from 'graphql'
import got from 'got'

async function getRemoteSchema() {
  const response = await got.post(process.env.GRAPHQL_URL, {
    json: {
      query: getIntrospectionQuery(),
    },
    responseType: 'json',
  })

  return response.body
}

async function run() {
  try {
    const response = await getRemoteSchema()
    const schema = buildClientSchema(response.data)

    fs.writeFileSync(
      path.join(process.cwd(), 'schema.graphql'),
      printSchema(schema)
    )
  } catch (err) {
    console.error(err)
  }
}

run()
