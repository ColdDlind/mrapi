import { isEqual } from 'lodash'
import getPrisma, {
  getPrismaClient,
  getPrismaDmmf,
} from '../src/getPrisma'
import path from 'path'
const testPrismaClientDir: string = path.join(
  process.cwd(),
  'examples/dal-basic/node_modules/.prisma-mrapi',
  'one',
)
const testOptions = [
  {
    name: 'one',
    defaultTenant: {
      name: 'dev',
    },
    PrismaClient: 'examples/dal-basic/basic/node_modules/.prisma-mrapi',
  },
  {
    name: 'two',
    openAPI: {
      enable: false,
    },
  },
]
beforeAll(() => {
  console.log('beforeAll')
})

beforeEach(() => {
  console.log('beforeEach')
})
describe('constant tests', () => {
  test('defaultConfig test', () => {})
})
describe('function tests', () => {
  test('getPrisma test', () => {
    expect(isEqual(getPrisma(testOptions), testOptions)).toBeTruthy()
    let outputDir: any = null
    expect(() => {
      getPrisma(outputDir)
    }).toThrow()
    outputDir = testPrismaClientDir
    const prismaPath = require(outputDir)
    expect(getPrisma(outputDir)).toBe(prismaPath)
  })
  test('getPrismaClient test', () => {
    let outputDir: any = null
    expect(() => {
      getPrismaClient(outputDir)
    }).toThrow()
    outputDir = testPrismaClientDir
    const prismaClient = require(outputDir).PrismaClient
    expect(isEqual(getPrismaClient(outputDir), prismaClient)).toBeTruthy()
  })
  test('getPrismaDmmf test', () => {
    let outputDir: any = null
    expect(() => {
      getPrismaDmmf(outputDir)
    }).toThrow()
    outputDir = testPrismaClientDir
    const prismaClient = require(outputDir).dmmf
    expect(isEqual(getPrismaDmmf(outputDir), prismaClient)).toBeTruthy()
  })
})
afterEach(() => {
  console.log('afterEach')
})

afterAll(() => {
  console.log('afterAll')
})
