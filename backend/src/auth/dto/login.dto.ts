import {IsEmail, IsNotEmpty, MinLength} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'

export class LoginDto {
  @IsNotEmpty() @IsEmail() @ApiProperty()
  readonly email: string
  @IsNotEmpty() @MinLength(8) @ApiProperty()
  readonly password: string
}
