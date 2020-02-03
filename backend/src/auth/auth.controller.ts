import {Body, Controller, Delete, Get, Post} from '@nestjs/common'
import {AuthService} from './auth.service'
import {LoginDto} from './dto/login.dto'

@Controller()
export class AuthController {
  constructor(private readonly service: AuthService) {
  }

  @Get('me')
  me() {
    return this.service.me()
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
