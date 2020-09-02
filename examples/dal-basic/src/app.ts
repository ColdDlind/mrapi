import DAL from '@mrapi/dal'
import type { DALOptions } from '@mrapi/dal/lib/types'

const options: DALOptions = [
  {
    name: 'one',
    defaultTenant: {
      name: 'dev', // 视乎可以不要 name
      // url: 'file:../config/db/prod.db',
    },
  },
  {
    name: 'two',
    // defaultTenant: {
    //   name: 'dev',
    // },
    openAPI: {
      enable: false,
    },
    // graphql: {
    //   enable: false,
    // },
    // nexusDir?: string;
    // prismaClientDir?: string;
  },
]

const app = new DAL(options)

let timer: any
app
  .start()
  .then(() => {
    // const thisApp = app.server.app

    timer = setTimeout(() => {
      // // stop test
      // app.stop().then(() => console.log('stop'))
      // // removeSchema test
      // const ok = app.removeSchema('one')
      // ok && console.log('removeSchema one')
      // // addSchema test
      // const ok2 = app.addSchema('two', {
      //   defaultTenant: {
      //     name: 'dev',
      //   },
      //   openAPI: {
      //     enable: false,
      //   },
      // })
      // ok2 && console.log('addSchema two ok')
    }, 1000 * 3)
  })
  .catch((e) => {
    clearTimeout(timer)
    timer = null

    console.error(e)
  })
