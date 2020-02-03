import {BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn} from 'typeorm'
import {IsDate, IsEmail, IsString, IsUUID} from 'class-validator'
import * as bcrypt from 'bcrypt'
import {Expose} from 'class-transformer'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid') @IsUUID()
  id: string
  @Column() @IsEmail()
  email: string
  @Column({select: false})
  password: string
  @Column() @IsString()
  first_name: string
  @Column() @IsString()
  last_name: string
  @Column() @IsDate()
  created_at: string
  @Column() @IsDate()
  updated_at: string

  @Expose() @IsString()
  get name(): string {
    return `${this.first_name} ${this.last_name}`
  }

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 10)
    }
  }
}
