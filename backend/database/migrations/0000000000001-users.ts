import {MigrationInterface, QueryRunner, Table} from 'typeorm'

export class users0000000000001 implements MigrationInterface {

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
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE users CASCADE')
  }

}

