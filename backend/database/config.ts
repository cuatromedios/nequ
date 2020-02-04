import {ConnectionOptions} from 'typeorm'
import {User} from '../src/user/user.entity'
import {Token} from '../src/auth/token.entity'

const config = (): ConnectionOptions => {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: false,
    entities: [
      User,
      Token
    ],
    synchronize: false
  }
}

export = config
