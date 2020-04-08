import {MigrationInterface, QueryRunner} from "typeorm";

export class V2DB1586334843987 implements MigrationInterface {
    name = 'V2DB1586334843987'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "amortizations" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "from" integer NOT NULL DEFAULT 0, "to" integer NOT NULL DEFAULT 0, "isDeleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_d58cd112eb3ea59d6f8fe366ff9" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "manufacturers" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_138520de32c379a48e703441975" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "models" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, "manufactureId" integer, CONSTRAINT "PK_ef9ed7160ea69013636466bf2d5" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD "yearOfManufacture" boolean`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD "modelId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "returnDateTime" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "models" ADD CONSTRAINT "FK_bc715759c7ad7cf93a1ee11ffad" FOREIGN KEY ("manufactureId") REFERENCES "manufacturers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_415edcdb4b9eaeb5dd6ee266590" FOREIGN KEY ("modelId") REFERENCES "models"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_415edcdb4b9eaeb5dd6ee266590"`, undefined);
        await queryRunner.query(`ALTER TABLE "models" DROP CONSTRAINT "FK_bc715759c7ad7cf93a1ee11ffad"`, undefined);
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "returnDateTime" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "modelId"`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "yearOfManufacture"`, undefined);
        await queryRunner.query(`DROP TABLE "models"`, undefined);
        await queryRunner.query(`DROP TABLE "manufacturers"`, undefined);
        await queryRunner.query(`DROP TABLE "amortizations"`, undefined);
    }

}
