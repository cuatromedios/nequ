import { HttpException, Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthService } from '../../auth/auth.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly auth: AuthService) {
  }

  async use(req: Request, res: Response, next: Function) {
    // Reads the Authorization header looking dor a Bearer or APIKey token
    // Is there is a token then a user is retrieved in the body.user property

    const user = await this.auth.userFromToken(req.header('Authorization'))

    if (!user) {
      next()
      return
    }

    req.body.user = user
    next()
    return
  }
}
