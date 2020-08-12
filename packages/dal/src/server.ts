import express, { Express } from 'express'
import {
  graphqlHTTP,
  // OptionsData
} from 'express-graphql'

export interface ServerOption {
  host?: string
  port?: number
}

const defaultConfig = {
  host: '0.0.0.0',
  port: 1358,
}

export type RouteOptions = any // OptionsData

export default class Server {
  app: Express

  constructor() {
    this.app = express()
  }

  start({ host, port }: ServerOption) {
    const PORT = port || defaultConfig.port
    const HOST = host || defaultConfig.host
    this.app.listen(PORT, HOST)

    console.log(`\n🚀 Server ready at: http://${HOST}:${PORT}\n`)

    return this.app
  }

  addRoute(name: string, options: RouteOptions) {
    this.app.use(
      `/${name}`,
      graphqlHTTP({
        graphiql: { headerEditorEnabled: true },
        ...options,
      }),
    )

    console.log(`\n⭐️ [${name}] Running a GraphQL API server at: /${name}\n`)
  }

  removeRoute(name: string) {
    const idx = this.app._router.stack.findIndex((r: any) => r.name === name)
    if (idx !== -1) {
      this.app._router.stack.splice(idx, 1)
    } else {
      console.error(`Route '${name}' not found`)
    }
  }
}
