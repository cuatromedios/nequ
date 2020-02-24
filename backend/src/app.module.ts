import {MiddlewareConsumer, Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'
import {TypeOrmModule} from '@nestjs/typeorm'
import * as ormConfig from '../database/config'
import {UserModule} from './user/user.module'
import {AuthModule} from './auth/auth.module'
import {AuthMiddleware} from './common/middleware/auth.middleware'
import {StoreModule} from './store/store.module'

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(ormConfig()),
    StoreModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }
}
