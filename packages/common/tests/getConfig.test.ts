import { MrapiConfig } from '../lib/getConfig'
import { isEqual } from 'lodash'
import getConfig, { defaultConfig } from '../src/getConfig'
import merge from 'deepmerge'
import path from 'path'
beforeAll(() => {
  console.log('beforeAll')
})

beforeEach(() => {
  console.log('beforeEach')
})
describe('constant tests', () => {
  test('defaultConfig test', () => {
    const testDefaultConfig: MrapiConfig = {
      envPath: 'config/.env',
      managementUrl: '',

      inputSchemaDir: 'config/prisma',

      schemaDir: 'prisma',

      outputDir: 'node_modules/.prisma-mrapi',

      tenantIdentity: 'mrapi-pmt',
      dal: {
        pmtErrorThrow: false,
        enableRepeatRoute: true,
      },
      api: {
        openapi: {
          dir: '/src/openapi',
          prefix: '/api',
        },
        graphql: {
          dir: '/src/graphql',
          path: '/graphql',
          playground: 'playground',
          sources: [],
        },
        server: {
          port: 1358,
          type: 'standalone',
          options: {},
        },
        schemaNames: [],
        autoGenerate: true,
        schemaIdentity: 'mrapi-schema',
      },
    }
    expect(isEqual(defaultConfig, testDefaultConfig)).toBeTruthy()
  })
})
describe('function tests', () => {
  describe('getConfig test', () => {
    test('getConfig test when no Params', async () => {
      const noParamGetConfig = getConfig()
      expect(noParamGetConfig).toBeUndefined()
    })

    test('getConfig test when params invalid', () => {
      const testConfigPath = 'jfsjg'
      const invalidGetConfig = getConfig(testConfigPath)
      console.log('invalidGetConfig', invalidGetConfig)
      expect(invalidGetConfig).toBeUndefined()
    })
    test('getConfig test when it not have default', () => {
      const testConfigPath = 'packages/common/tests/mock/noDefaultConfig'
      const paramGetConfig = getConfig(testConfigPath)
      const configPath = path.join(process.cwd(), testConfigPath)
      const config = require(configPath)
      console.log('config', config)
      console.log('default', defaultConfig)
      const testMerge = merge(defaultConfig, config)
      expect(isEqual(paramGetConfig, testMerge)).toBeTruthy()
    })
    test('getConfig test when it has param', () => {
      const testConfigPath = 'packages/common/tests/mock/config'
      const paramGetConfig = getConfig(testConfigPath)
      const configPath = path.join(process.cwd(), testConfigPath)
      const config = require(configPath).default
      const testMerge = merge(defaultConfig, config)
      expect(isEqual(paramGetConfig, testMerge)).toBeTruthy()
      expect(paramGetConfig).toEqual(testMerge)
      // expect(1).toBe(1)
    })
  })
})
afterEach(() => {
  console.log('afterEach')
})

afterAll(() => {
  console.log('afterAll')
})
