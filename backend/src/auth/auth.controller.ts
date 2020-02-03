import {Body, Controller, Delete, Get, Post} from '@nestjs/common'
import {AuthService} from './auth.service'
import {LoginDto} from './dto/login.dto'
import {User} from '../user/user.entity'

@Controller()
export class AuthController {
  constructor(private readonly service: AuthService) {
  }

  @Get('me')
  me(@Body('user') user: User) {
    return this.service.me(user)
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.service.login(dto)
  }

  @Delete('logout')
  logout() {
    return this.service.logout()
  }
}
