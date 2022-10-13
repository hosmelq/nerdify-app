module.exports = {
  artifactDirectory: './__generated__',
  customScalars: {
    Date: 'string',
    DateTime: 'string',
    URL: 'string',
  },
  excludes: ['**/node_modules/**', '**/__generated__/**'],
  language: 'typescript',
  noFutureProofEnums: true,
  schema: './schema.graphql',
  src: './',
}
