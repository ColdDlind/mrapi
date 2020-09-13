import { PACKAGES, DEPS, getLatestVersion } from '../../scripts/publish'
beforeAll(() => {
  console.log('beforeAll')
})

beforeEach(() => {
  console.log('beforeEach')
})
describe('constant tests', () => {
  test('PACKAGES test', () => {
    const testPackage = ['core', 'cli', 'create-mrapi-app']
    for (let i = 0; i < testPackage.length; i++) {
      expect(PACKAGES).toContain(testPackage[i])
    }
  })
  test('DEPS test', () => {
    const testDeps = ['@mrapi/core', '@mrapi/cli']
    for (let i = 0; i < testDeps.length; i++) {
      expect(DEPS).toContain(testDeps[i])
    }
  })
})
describe('function tests', () => {
  test('getLatestVersion test', async () => {
    const res = await getLatestVersion()
    expect(typeof res).toBe('string')
  })
})
afterEach(() => {
  console.log('afterEach')
})

afterAll(() => {
  console.log('afterAll')
})
