module.exports = {
  host: 'localhost',
  port: 1358,
  logger: {
    prettyPrint: true,
  },
  graphql: {
    endpoint: '/graphql',
    playground: 'playground',
    resolvers: {
      generated: '../src/generated',
      custom: './src/resolvers',
    },
    emitSchemaFile: 'exports/schema.graphql',
    validate: false,
    jit: 1,
    queryDepth: 100,
  },
  cors: {
    credentials: true,
  },
}
