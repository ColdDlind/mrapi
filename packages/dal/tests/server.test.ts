
import Server from '../src/server'
import path from 'path'
import { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql'
const testPrismaClientDir:string = path.join(process.cwd(),'packages/dal/tests/mock/prisma','one')
// const testPrismaClientDir:string = path.join(process.cwd(),'packages/dal/tests/mock/prisma','tow')

 beforeAll(() => {
   console.log('beforeAll')
 })

 beforeEach(() => {
   console.log('beforeEach')
 })
 describe('constant tests', () => {

 })
 describe('function tests', () => {
     test('defaultOptions test', () => {
        const server = new Server({},() => {})
        // const testServer = express().listen(1358,'0.0.0.0')
        const start = server.start()
        expect(start).not.toBeUndefined()
     })
     test('options test',() => {
        const server = new Server({ host: '127.0.0.1',port: 8899 },() => {})
        const start = server.start()
        expect(start).not.toBeUndefined()
     })
     test('stop',() => {
        const server = new Server({ host: '127.0.0.1',port: 9988 },() => {})
        expect(() => { server.stop() }).toThrow()
        server.start()
        expect(() => { server.stop() }).not.toThrow()
     })
     test('addRoute',() => {
        const server = new Server({ host: '127.0.0.1',port: 9987 },() => {})
        // server.start()
        const AddressType = new GraphQLObjectType({
            name: 'Address',
            fields: {
              street: { type: GraphQLString },
              number: { type: GraphQLInt },
              formatted: {
                type: GraphQLString,
                resolve(obj) {
                  return obj.number
                },
              },
            },
          })
        const myAppSchema = new GraphQLSchema({
            query: AddressType,
        })
        expect(
            server.addRoute('/testRoutes',{
                graphql: {
                    schema: myAppSchema,
                },
                openAPI: {
                    oasDir: path.join(process.cwd(),'packages/dal/tests/mock/.prisma-mrapi/one', 'api'),
                },
                prismaClientDir: testPrismaClientDir,
            }),
        ).toBeTruthy()
        expect(
            server.addRoute('/testRoutes',{
                graphql: {
                    schema: myAppSchema,
                },
                openAPI: {
                    oasDir: path.join(process.cwd(),'packages/dal/tests/mock/.prisma-mrapi/one', 'api'),
                },
                enableRepeat: false,
                prismaClientDir: testPrismaClientDir,
            }),
        ).toBeFalsy()
     })
 })
 afterEach(() => {
   console.log('afterEach')
 })

 afterAll(() => {
   console.log('afterAll')
 })
