import {MigrationInterface, QueryRunner, Table} from 'typeorm'

export class tokens0000000000002 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'tokens',
      columns: [
        {name: 'id', type: 'uuid', isPrimary: true, default: 'uuid_generate_v4()'},
        {name: 'user_id', type: 'uuid'},
        {name: 'token', type: 'text'},
        {name: 'created_at', type: 'timestamp(0) without time zone', default: 'NOW()'},
        {name: 'updated_at', type: 'timestamp(0) without time zone', default: 'NOW()'}
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE tokens CASCADE')
  }

}
