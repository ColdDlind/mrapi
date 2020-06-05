import * as fs from 'fs-extra'
import { join, dirname } from 'path'
import execa, { Options as ExecaOptions } from 'execa'

import { MrapiOptions } from '../types'
import { requireFromProject } from './tools'

const PRISMA_CLIENT = '.prisma/client'

export const checkPrismaClient = () => {
  // from prisma-beta.4, Prisma Client is now generated into a folder called node_modules/.prisma
  // https://github.com/prisma/prisma/releases/tag/2.0.0-beta.4
  try {
    const client = requireFromProject(PRISMA_CLIENT)
    return client && !!client.dmmf ? client : false
  } catch (err) {
    return false
  }
}

export const checkPrismaSchema = (database: any, cwd = process.cwd()) => {
  const schemaFilePath = join(
    cwd,
    database?.schemaOutput || 'prisma/schema.prisma',
  )
  return fs.pathExists(schemaFilePath)
}

export const prepare = async (options: MrapiOptions, cwd = process.cwd()) => {
  if (!(await checkPrismaSchema(options.database, cwd))) {
    await generate(options, cwd)
    await migrate.save(options, cwd, '')
    await migrate.up(options, cwd, '')
  }
}

export const getDmmf = async (options: MrapiOptions, cwd = process.cwd()) => {
  const client = checkPrismaClient()
  if (client) {
    return client.dmmf
  }

  const models = []
  const schemaPath = join(cwd, options.database.schemaOutput)
  const content = await fs.readFileSync(schemaPath, 'utf8')
  const lines = content.split(`
`)
  for (let line of lines) {
    const clearedLine = line.replace(/[\n\r]/g, '')
    if (!clearedLine) {
      continue
    }
    const lineArray = clearedLine.split(' ')
    const filteredArray = lineArray.filter((v) => v)
    if (filteredArray[0] === 'model' && filteredArray[1]) {
      const name = filteredArray[1]
      if (!models.includes(name)) {
        models.push(name)
      }
    }
  }

  return models
}

export const runPrisma = async (cmd: string, options?: ExecaOptions) => {
  const args = cmd.split(' ').filter(Boolean)
  return execa('prisma', args, options)
}

// create schema.prisma file
export const create = async (
  { database, server, plugins }: MrapiOptions,
  cwd = process.cwd(),
) => {
  if (!database || !database.schema) {
    throw new Error('database.schema is required')
  }
  console.log('[mrapi] creating schema.prisma ...')
  const prismaFilePath = join(cwd, database.schema)
  const userSchemaContent = await fs.readFile(prismaFilePath, 'utf8')
  const URL =
    database.url ||
    `${database.provider}://${database.user}:${database.password}@${database.host}:${database.port}/${database.database}`
  const TYPE_GRAPHQL_PROVIDER = 'node_modules/typegraphql-prisma/generator.js'
  const TYPE_GRAPHQL_OUTPUT =
    plugins['builtIn:graphql']?.options?.buildSchema?.resolvers?.generated ||
    '../src/generated'
  const baseSchemaContent = await fs.readFile(
    join(__dirname, '../../resource/schema.prisma'),
    'utf8',
  )

  const schema =
    '// Generated by mrapi. DO NOT modify it manually.\n' +
    baseSchemaContent.replace('$DB_PROVIDER$', database.provider) +
    '\n' +
    userSchemaContent
  const schemaOutput = join(cwd, database.schemaOutput)
  await fs.outputFile(schemaOutput, schema)
  const envPath = join(dirname(database.schemaOutput), '.env')
  await fs.outputFile(
    envPath,
    `# Generated by mrapi. DO NOT modify it manually.
DB_URL="${URL}"
TYPE_GRAPHQL_PROVIDER="${TYPE_GRAPHQL_PROVIDER}"
TYPE_GRAPHQL_OUTPUT="${TYPE_GRAPHQL_OUTPUT}"
`,
  )
}

export const generate = async (options: MrapiOptions, cwd = process.cwd()) => {
  await create(options, cwd)

  console.log('[mrapi] prisma generate...')
  const envPath = join(dirname(options.database.schemaOutput), '.env')
  require('dotenv').config({
    path: envPath,
  })
  try {
    await runPrisma('generate', {
      preferLocal: true,
      stdout: 'ignore',
    })
  } catch (err) {
    if (!err.message.includes('defined any model in your schema.prisma')) {
      throw err
    }
  }
  process.exit(0)
}

export const migrate = {
  save: async (
    options: MrapiOptions,
    cwd = process.cwd(),
    name,
    config = {},
  ) => {
    if (!(await checkPrismaSchema(options, cwd))) {
      await create(options, cwd)
    }

    console.log('prisma migrate save...')
    const schemaFilePath = join(cwd, options.database.schemaOutput)
    await runPrisma(
      `migrate save --create-db --name '' --experimental --schema=${schemaFilePath}`,
      {
        preferLocal: true,
        stdout: 'inherit',
      },
    )
  },
  up: async (options: MrapiOptions, cwd = process.cwd(), name, config = {}) => {
    if (!(await checkPrismaSchema(options.database, cwd))) {
      await create(options, cwd)
    }

    const schemaFilePath = join(cwd, options.database.schemaOutput)
    console.log('prisma migrate up...')
    await runPrisma(`migrate up --experimental --schema=${schemaFilePath}`, {
      preferLocal: true,
      stdout: 'inherit',
    })
  },
}

export const studio = async (
  options: MrapiOptions,
  cwd = process.cwd(),
  config = {},
) => {
  await runPrisma('studio --experimental', {
    preferLocal: true,
    stdout: 'inherit',
  })
}
