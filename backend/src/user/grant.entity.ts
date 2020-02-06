import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import {IsDate, IsOptional, IsString, IsUUID} from 'class-validator'
import {User} from './user.entity'

@Entity('grants')
export class Grant {
  @PrimaryGeneratedColumn('uuid') @IsUUID()
  id: string
  @Column() @IsUUID()
  user_id: string
  @Column() @IsUUID() @IsOptional()
  entity_id: string
  @Column() @IsString()
  name: string
  @Column() @IsDate()
  created_at: string
  @Column() @IsDate()
  updated_at: string

  @ManyToOne(type => User, m => m.raw_grants)
  @JoinColumn({name: 'user_id'})
  user: User
}
