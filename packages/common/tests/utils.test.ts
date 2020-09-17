
import {
  getUrlAndProvider,
  pathExists,
  getNodeModules,
} from '../src/utils'

const testNodeModules = '/Users/clik/Documents/clikchengmrapi/mrapi/node_modules'

// import { getUrlAndProvider } from '../../packages/common/src/getUrlAndProvider'
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
  test('getUrlAndProvider two test', () => {
    const result = getUrlAndProvider('file://root:123456@127.0.0.1:3306/')
    expect(result.url).toBe('file://root:123456@127.0.0.1:3306/')
    expect(result.provider).toBe('sqlite')
  })
  test('getUrlAndProvider three test', () => {
    const str = '://root:123456@127.0.0.1:3306/'
    expect(() => {
      getUrlAndProvider(str)
    }).toThrow()
  })
  test('getUrlAndProvider four test', () => {
    const str = 'fsafafe://root:123456@127.0.0.1:3306/'
    expect(() => {
      getUrlAndProvider(str)
    }).toThrow()
  })
  test('getUrlAndProvider test', () => {
    const strArr: string[] = ['postgresql', 'mysql']
    let str: string | null = ''
    expect(() => {
      getUrlAndProvider(null)
    }).toThrow()
    // str = '127.0.0.1'
    expect(() => {
      getUrlAndProvider(str)
    }).toThrow()

    strArr.forEach((item) => {
      str = `${item}://root:123456@127.0.0.1:3306/`
      const result = getUrlAndProvider(str)
      expect(result).toEqual({ url: str, provider: item })
    })
  })
  test('pathExists test', async () => {
    const res = await pathExists(process.cwd() + '/yarn.lock')
    expect(res).toBeFalsy()
  })
  test('pathExists two test', async () => {
    const res = await pathExists(process.cwd() + 'test/common/testData/utils', {
      read: true,
    })
    expect(res).toBeFalsy()
  })
  test('pathExists three test', async () => {
    const res = await pathExists(process.cwd() + 'test/common/testData/utils', {
      write: true,
    })
    expect(res).toBeFalsy()
  })

  test('pathExists four test', async () => {
    const res = await pathExists(process.cwd() + 'test/common/testData/utils', {
      exec: true,
    })
    expect(res).toBeFalsy()
  })
  test('getNodeModules test', () => {
    const firstGet = getNodeModules()
    expect(firstGet).toEqual(testNodeModules)
    const secondGet = getNodeModules()
    expect(secondGet).toEqual(testNodeModules)
    // expect(res).toContain(testNodeModules)
  })
  // test('dsada', () => {
  //    expect(testFunciton()).toBe(1)
  // })
})
afterEach(() => {
  console.log('afterEach')
})

afterAll(() => {
  console.log('afterAll')
})
