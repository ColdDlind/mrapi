 import PMTManage from '../src/prisma/PMTManage'
 import { MultiTenant } from '@prisma-multi-tenant/client'
 import PrismaClient from '@prisma/client'
 const testMultiTenantParam = {
  useManagement: true,
  managementUrl: 'mysql',
  PrismaClient: PrismaClient,
}
const setParam:any = {
  name: 'abc',
  options: {
    PrismaClient: PrismaClient,
  },
}
const testMultiTenant = new MultiTenant(testMultiTenantParam)
//  const testManagemengUrl = path.join(process.cwd(),'/dal/tests/mock/prisma')
  beforeAll(() => {
    console.log('beforeAll')
  })

  beforeEach(() => {
    console.log('beforeEach')
  })
  describe('constant tests', () => {

  })
  describe('function tests', () => {
      test('pmt', () => {
          const pmt = new PMTManage({ managementUrl: 'mysql' })
          const nullMap = new Map()
          const result:any = { multiTenants: nullMap, options: { managementUrl: 'mysql', useManagement: true } }
          expect(pmt).toEqual(result)
      })
      test('setPMT And getPMT',() => {
        const pmt = new PMTManage({ managementUrl: 'mysql' })
        expect(pmt.setPMT(setParam.name)).toBeUndefined()
        expect(() => { pmt.getPMT(setParam.name) }).toThrow()
        expect(pmt.setPMT(setParam.name,setParam.options)).toBeUndefined()
        expect(pmt.getPMT(setParam.name)).toEqual(testMultiTenant)
        expect(pmt.setPMT(setParam.name)).toBeUndefined()
      })
      test('directGet', async () => {
        const pmt = new PMTManage({ managementUrl: 'mysql' })
        const res = pmt.getPrisma(setParam.name,'clikcheng','file:dev1.db')
        expect(res).toBeDefined()
      })
      test('pmt getPrisma',async() => {
        const pmt = new PMTManage({ managementUrl: 'mysql' })
        const res = pmt.getPrisma(setParam.name,'clikcheng')
        expect(res).toBeDefined()
      })
  })
  afterEach(() => {
    console.log('afterEach')
  })

  afterAll(() => {
    console.log('afterAll')
  })
