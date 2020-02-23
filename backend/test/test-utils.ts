import {Test, TestingModule} from '@nestjs/testing'
import {AppModule} from '../src/app.module'
import {INestApplication, ValidationPipe} from '@nestjs/common'
import {GlobalExceptionsFilter} from '../src/common/filters/exceptions.filter'
import {Connection, QueryRunner} from 'typeorm'

export class Suite {
  app: INestApplication
  db: Connection
  runner: QueryRunner
}

export async function build(): Promise<Suite> {
  const suite = new Suite()
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()
  suite.app = moduleFixture.createNestApplication()
  suite.app.setGlobalPrefix('api')
  suite.app.useGlobalPipes(new ValidationPipe({whitelist: true}))
  suite.app.useGlobalFilters(new GlobalExceptionsFilter())

  suite.db = moduleFixture.get(Connection)
  suite.runner = suite.db.createQueryRunner('master')
  await suite.app.init()
  return suite
}

export function hasKeys(keys = []): Function {
  return res => {
    keys.forEach(key => {
        if (!res.body[key]) throw new Error(`Missing ${key} key`)
      }
    )
  }
}
