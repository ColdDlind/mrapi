
jest.mock('../src/prisma/PMTManage.ts')
const PMTManage = require('../src/prisma/PMTManage.ts')
const mMock = jest.fn()
beforeAll(() => {
  console.log('beforeAll')
})

beforeEach(() => {
    mMock.mockClear()
//   PMTManage.mockClear()
})
describe('constant tests', () => {
  test('defaultConfig test', () => {})
})
describe('function tests', () => {
    test('getPTM', () => {
        PMTManage.mockImplementation(() => {
            return {
              m: mMock,
            }
          })
        const pmt = new PMTManage()
        pmt.m('a','b')
        console.log('Calls to m: ', mMock.mock.calls)
        expect(1).toBe(1)
    })
})
afterEach(() => {
  console.log('afterEach')
})

afterAll(() => {
  console.log('afterAll')
})
