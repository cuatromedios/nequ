import {BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

const sha256 = require('sha256')

@Entity('tokens')
export class Token {

  @PrimaryGeneratedColumn('uuid') id: string
  @Column() user_id: string
  @Column() token: string
  @Column() created_at: string
  @Column() updated_at: string

  @BeforeInsert()
  hashToken() {
    this.token = sha256(this.token)
  }
}
