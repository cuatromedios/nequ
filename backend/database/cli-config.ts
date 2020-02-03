import {ConnectionOptions} from 'typeorm'

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [],
  synchronize: false,
  migrations: ['database/migrations/*.ts'],
  cli: {migrationsDir: 'database/migrations'}
}

export = config
