import path from 'path'
import merge from 'deepmerge'

export interface MrapiConfig {
  managementUrl?: string
  envPath?: string
  inputSchemaDir?: string
  schemaDir?: string
  outputDir?: string
  tenantIdentity?: string
  api: {
    [type: string]: any
  }
}

const defaultConfig: MrapiConfig = {
  // .env filePath
  envPath: 'config/.env',

  // management pmt db uri
  managementUrl: '',

  // input schema file to generate
  inputSchemaDir: 'config/prisma',

  // schema directory
  schemaDir: 'prisma',

  // output directory （cnt and pmt）
  outputDir: 'node_modules/.prisma-mrapi',

  // multi-tenant identification (use in HTTP Request Header)
  tenantIdentity: 'mrapi-pmt',

  // @mrapi/api config
  api: {
    // @mrapi/api openapi config
    openapi: {
      // @mrapi/api openapi custom api dir
      dir: '/src/openapi',
      // @mrapi/api openapi custom api preifx
      prefix: '/api',
    },

    // @mrapi/api graphql config
    graphql: {
      // @mrapi/api graphql custom api dir
      dir: '/src/graphql',
      // @mrapi/api graphql api prefix
      path: '/graphql',
      // @mrapi/api graphql playground
      playground: 'playground',
      // @mrapi/api graphql sources
      sources: [],
    },

    // @mrapi/api server config
    server: {
      // @mrapi/api server listen port
      port: 1358,
      // @mrapi/api server type
      type: 'standalone',
      // @mrapi/api fastify server options
      options: {},
    },
    // @mrapi/api prisma schema names array
    schemaNames: [],
    // auto run scripts mrapi generate
    autoGenerate: true,
    // mrapi db choose header key
    dbIdentity: 'mrapi-db',
  },
}

export default function getConfig(str?: string): MrapiConfig {
  let config
  const configPath = path.join(process.cwd(), str || 'config/mrapi.config.js')
  try {
    config = require(configPath)
    if (config.defualt) {
      config = config.defualt
    }
  } catch { }

  return config ? merge(defaultConfig, config) : config
}
