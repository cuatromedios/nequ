import {MigrationInterface, QueryRunner, Table} from 'typeorm'
import * as uuid from 'uuid/v4'
import * as bcrypt from 'bcrypt'

export class users0000000000003 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {name: 'id', type: 'uuid', isPrimary: true, default: 'uuid_generate_v4()'},
        {name: 'email', type: 'text'},
        {name: 'password', type: 'text'},
        {name: 'first_name', type: 'text'},
        {name: 'last_name', type: 'text'},
        {name: 'created_at', type: 'timestamp(0) without time zone', default: 'NOW()'},
        {name: 'updated_at', type: 'timestamp(0) without time zone', default: 'NOW()'}
      ]
    }))

    // Generate a random admin
    const password = uuid().replace(/-/g, '')
    const hashed = bcrypt.hashSync(password, 10)
    const admin = await queryRunner.query(`
      INSERT INTO users (email, password, first_name, last_name) 
      VALUES ($1, $2, $3, $4) RETURNING id`,
      ['admin@nequ.dev', hashed, 'Ne', 'Qu'])
    await queryRunner.query(`
      INSERT INTO grants (user_id, name) VALUES ($1, $2)
    `, [admin[0].id, 'admin'])
    console.log(`
    @@@@@@@@@@@@@@@@@@@@
    
    NeQu ADMIN GENERATED
    email: admin@nequ.dev
    password: ${password}
    
    @@@@@@@@@@@@@@@@@@@@
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE users CASCADE')
  }

}

