import {MigrationInterface, QueryRunner, Table} from 'typeorm'

export class grants0000000000001 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    await queryRunner.createTable(new Table({
      name: 'grants',
      columns: [
        {name: 'id', type: 'uuid', isPrimary: true, default: 'uuid_generate_v4()'},
        {name: 'user_id', type: 'uuid'},
        {name: 'entity_id', type: 'uuid', isNullable: true},
        {name: 'name', type: 'text'},
        {name: 'created_at', type: 'timestamp(0) without time zone', default: 'NOW()'},
        {name: 'updated_at', type: 'timestamp(0) without time zone', default: 'NOW()'}
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE grants')
  }

}
