import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import {IsDate, IsOptional, IsString, IsUUID} from 'class-validator'
import {User} from './user.entity'
import { BasicEntity } from 'src/common/entities/basic.entity'

@Entity('grants')
export class Grant extends BasicEntity {
  
  @Column('uuid') @IsUUID()
  user_id: string

  @Column({type:'uuid', nullable: true}) @IsUUID() @IsOptional()
  entity_id: string

  @Column() @IsString()
  name: string

  @ManyToOne(type => User, m => m.raw_grants)
  @JoinColumn({name: 'user_id'})
  user: User
}
