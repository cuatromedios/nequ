import {HttpException, Injectable, NestMiddleware} from '@nestjs/common'
import {Request, Response} from 'express'
import {AuthService} from '../../auth/auth.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly auth: AuthService) {
  }

  async use(req: Request, res: Response, next: Function) {
    const routesWithoutAuth = ['/api/login']
    if (routesWithoutAuth.includes(req.baseUrl)) return next()
    const user = await this.auth.userFromToken(req.header('Authorization'))
    if (!user) throw new HttpException({message: 'auth_needed'}, 403)
    req.body.user = user
    next()
  }
}
