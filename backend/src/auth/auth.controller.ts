import { Body, Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { User } from '../user/user.entity'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/common/guards/Auth.guard'

@ApiBearerAuth()
@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(private readonly service: AuthService) {
  }

  @Get('me')
  @UseGuards(AuthGuard)
  me(@Body('user') user: User | any) {
    return this.service.me(user)
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.service.login(dto)
  }

  @Post('signup')
  signup(@Body() dto: LoginDto) {
    return this.service.signUp(dto)
  }

  @Delete('logout')
  @UseGuards(AuthGuard)
  logout(@Req() req: Request) {
    return this.service.logout(req.header('Authorization'))
  }
}
