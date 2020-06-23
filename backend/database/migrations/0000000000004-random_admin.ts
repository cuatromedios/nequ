import {MigrationInterface, QueryRunner, Table} from 'typeorm'
import * as uuid from 'uuid/v4'
import * as bcrypt from 'bcrypt'

export class random_admin0000000000004 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
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
    await queryRunner.query(`DELETE FROM grants WHERE user_id=(SELECT id FROM users WHERE email='admin@nequ.dev')`)
    await queryRunner.query(`DELETE FROM users WHERE email='admin@nequ.dev'`,)
  }

}
