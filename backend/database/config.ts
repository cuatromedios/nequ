import {ConnectionOptions} from 'typeorm'

const config = (): ConnectionOptions => {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: process.env.APP_ENV === 'local',
    entities: [],
    synchronize: false
  }
}

export = config
