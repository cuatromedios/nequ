import {MigrationInterface, QueryRunner, Table} from 'typeorm'

export class grants0000000000003 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE "grants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "user_id" uuid NOT NULL, "entity_id" uuid, "name" character varying NOT NULL, CONSTRAINT "PK_a25f5f89eff8b3277f7969b7094" PRIMARY KEY ("id"))`, undefined);
    await queryRunner.query(`ALTER TABLE "grants" ADD CONSTRAINT "FK_501eb48e321a0f302707ec42aa3" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);


  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "grants" DROP CONSTRAINT "FK_501eb48e321a0f302707ec42aa3"`, undefined);
    await queryRunner.query(`DROP TABLE "grants"`, undefined);
  }

}
