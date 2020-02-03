import {IsEmail, IsNotEmpty, MinLength} from 'class-validator'

export class LoginDto {
  @IsNotEmpty() @IsEmail()
  readonly email: string
  @IsNotEmpty() @MinLength(8)
  readonly password: string
}
