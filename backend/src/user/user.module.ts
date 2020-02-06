import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {User} from './user.entity'
import {Grant} from './grant.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, Grant])],
  exports: [TypeOrmModule]
})
export class UserModule {
}
