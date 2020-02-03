import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'
import {TypeOrmModule} from '@nestjs/typeorm'
import * as ormConfig from '../database/config'
import {UserModule} from './user/user.module'
import {AuthModule} from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(ormConfig()),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {
}
