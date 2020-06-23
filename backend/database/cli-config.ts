import {ConnectionOptions} from 'typeorm'
import * as ormConfig from './ormconfig'

let conf = ormConfig()

const config: ConnectionOptions = {
  ...conf,
  migrations: ['database/migrations/*.ts'],
  cli: {migrationsDir: 'database/migrations'}
}

export = config
