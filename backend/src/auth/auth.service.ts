import { HttpException, Injectable } from '@nestjs/common'
import { LoginDto } from './dto/login.dto'
import { User } from '../user/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getConnection } from 'typeorm'
import * as bcrypt from 'bcrypt'
import * as uuid from 'uuid/v4'
import { Token } from './token.entity'
import { classToPlain } from 'class-transformer'
import { Grant } from 'src/user/grant.entity'

const sha256 = require('sha256')

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Token)
    private readonly tokenRepo: Repository<Token>,
  ) {
  }

  async generateToken(user_id) {
    let rawToken = uuid()
    let token = new Token()
    token.user_id = user_id
    token.token = rawToken
    await this.tokenRepo.save(token)
    return rawToken
  }

  async userFromToken(rawToken) {
    if (!rawToken) return null
    let splitted = rawToken.split(' ')
    if (splitted.length < 2) {
      // Bad format for the token
      return null
    }
    rawToken = splitted[1]
    let hashed = sha256(rawToken)
    let token = await this.tokenRepo.findOne({ token: hashed })
    if (!token) return null
    return this.userRepo.findOne(token.user_id)
  }

  me(user: User) {
    return classToPlain(user)
  }

  async login(dto: LoginDto) {
    let user = await this.userRepo.createQueryBuilder()
      .addSelect('User.password')
      .where({ email: dto.email.toLowerCase() })
      .getOne()
    if (!user || !bcrypt.compareSync(dto.password, user.password)) {
      throw new HttpException('invalid_credentials', 422)
    }
    let token = await this.generateToken(user.id)
    return { token }
  }

  async signUp(dto: LoginDto) {
    // Exist?
    let exist = await this.userRepo.findOne({ where: { email: dto.email } })

    if (exist) {
      throw new HttpException('User already exists', 409)
    }

    // Creating user
    let user: User = await this.userRepo.create()
    user.email = dto.email;
    user.password = dto.password;
    user.first_name = ""
    user.last_name = ""
    user = await this.userRepo.save(user)
    delete user.password; // Avoid returning this data

    // Permisos de usuario
    let repo = getConnection().getRepository(Grant)
    let grant: Grant = await repo.create()
    grant.user_id = user.id
    grant.name = 'user'
    repo.save(grant);

    return { user }
  }

  async logout(token) {
    token = token.split(' ')[1]
    let hashed = sha256(token)
    await this.tokenRepo.createQueryBuilder()
      .delete()
      .where({ token: hashed })
      .execute()
    return {}
  }
}
