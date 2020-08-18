import DAL, { DALOptions } from '@mrapi/dal'
import path from 'path'

const TEST_NAME = 'dev'

const options: DALOptions = [
  {
    name: TEST_NAME,
    schema: {
      prismaClientDir: path.join(
        process.cwd(),
        'node_modules',
        '.prisma-tqt/one',
      ),
      schemaDir: path.join(process.cwd(), 'dist/types/one'),
    },
  },
]

const app = new DAL(options)

let timer: any
app
  .start()
  .then(() => {
    timer = setTimeout(() => {
      // // stop test
      // app.stop().then(() => console.log('stop'))
      // // removeSchema test
      // const ok = app.removeSchema(TEST_NAME)
      // ok && console.log('removeSchema ' + TEST_NAME)
      // // addSchema test
      // const ok2 = app.addSchema('devThree', {
      //   schema: {
      //     schemaDir: path.join(process.cwd(), 'dist/types/two'),
      //     prismaClientDir: path.join(process.cwd(), 'node_modules', '.prisma-tqt/two'),
      //   },
      // })
      // ok2 && console.log('addSchema ok')
    }, 1000 * 3)
  })
  .catch((e) => {
    clearTimeout(timer)
    timer = null

    console.error(e)
  })
