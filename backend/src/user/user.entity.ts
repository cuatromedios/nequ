import {BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {IsArray, IsEmail, IsObject, IsString} from 'class-validator'
import * as bcrypt from 'bcrypt'
import {Exclude, Expose} from 'class-transformer'
import {Grant} from './grant.entity'
import { BasicEntity } from 'src/common/entities/basic.entity'

@Entity('users')
export class User extends BasicEntity {
  @Column() @IsEmail()
  email: string

  @Column({select: false})
  password: string

  @Column() @IsString()
  first_name: string

  @Column() @IsString()
  last_name: string

  @Expose() @IsString()
  get name(): string {
    return `${this.first_name} ${this.last_name}`
  }

  @Expose() @IsArray()
  get grants(): Array<string> {
    if (!this.raw_grants) return []
    return this.raw_grants
      .filter(grant => grant.entity_id === null) // Only those with null entity_id (without a specific entity the grants apply to all the entities)
      .map(grant => grant.name) // Just the names
  }

  @Expose() @IsObject()
  get entity_grants(): Object {
    if (!this.raw_grants) return {}
    const grants = {}
    this.raw_grants
      .filter(grant => !!grant.entity_id) // Only those related to an entity
      .forEach(grant => { // Mapped in an dictionary of type {'entity_id':[..grants-names]}
        if (!grants[grant.entity_id]) grants[grant.entity_id] = []
        grants[grant.entity_id].push(grant.name)
      })
    return grants
  }

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 10)
    }
  }

  @Exclude()
  @OneToMany(type => Grant, m => m.user, {eager: true})
  raw_grants: Grant[]
}
