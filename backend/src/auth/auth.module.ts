import {Module} from '@nestjs/common'
import {AuthController} from './auth.controller'
import {AuthService} from './auth.service'
import {UserModule} from '../user/user.module'
import {TypeOrmModule} from '@nestjs/typeorm'
import {Token} from './token.entity'

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [TypeOrmModule.forFeature([Token]), UserModule],
  exports: [AuthService]
})
export class AuthModule {
}
