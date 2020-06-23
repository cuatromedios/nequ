import {BeforeInsert, Column, Entity} from 'typeorm'
import { BasicEntity } from 'src/common/entities/basic.entity'

const sha256 = require('sha256')

@Entity('tokens')
export class Token extends BasicEntity{

  @Column('uuid') user_id: string
  @Column() token: string

  @BeforeInsert()
  hashToken() {
    this.token = sha256(this.token)
  }
}
