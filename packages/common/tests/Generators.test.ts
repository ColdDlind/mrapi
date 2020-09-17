import { tscOptions, Generators } from '../src/Generators'
const testTsc: string =
  '-t es2018 --lib esnext --module commonjs --moduleResolution node --allowSyntheticDefaultImports --esModuleInterop --importHelpers --resolveJsonModule --sourceMap false  --declaration --skipLibCheck'
// jest.mock('../../packages/common/src/Generators')
beforeAll(() => {
  console.log('beforeAll')
})

beforeEach(() => {
  // Generators.mockClear()
})
describe('constants tests', () => {
  test('tscOptions test', () => {
    expect(tscOptions).toBe(testTsc)
  })
})

describe('class tests', () => {
  test('Generators ToJs test', async () => {
    const testGenerators = new Generators()
    const res = await testGenerators.toJS()
    expect(res).toBeUndefined()
  })
  // test('Generators dmmf test', async () => {
  //   const testGenerators = Generators.mock.dmmf()
  //   // expect(res).toBeUndefined()
  // })
  // test('Generators datamodel test', () => {
  //   const testGenerators = new Generators()
  //   const datamodel = testGenerators.datamodel()
  //   console.log(datamodel)
  // })
})

afterEach(() => {
  console.log('afterEach')
})

afterAll(() => {
  console.log('afterAll')
})
