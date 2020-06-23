import { PrimaryGeneratedColumn, Column, BeforeUpdate } from "typeorm";
import { IsUUID, IsDate } from "class-validator";

export abstract class BasicEntity{
    @PrimaryGeneratedColumn('uuid') @IsUUID()
    id: string

    @Column({type: 'timestamptz', default:()=>'NOW()'}) @IsDate()
    created_at: string

    @Column({type: 'timestamptz', default:()=>'NOW()'}) @IsDate()
    updated_at: string

    @BeforeUpdate()
    updatedAt(){
        this.updated_at = new Date(Date.now()).toISOString()
    }
}