import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDB1582115920654 implements MigrationInterface {
    name = 'CreateDB1582115920654'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "contracts" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "img" character varying NOT NULL, "age" integer NOT NULL, "days" integer NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, "pickUpDateTime" TIMESTAMP NOT NULL, "returnDateTime" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "carId" integer, CONSTRAINT "PK_2c7b8f3a7b1acdd49497d83d0fb" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "cars" ("id" SERIAL NOT NULL, "model" character varying(200) NOT NULL, "img" character varying, "allLikes" integer NOT NULL DEFAULT 0, "isFree" boolean NOT NULL DEFAULT true, "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "carClassId" integer, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "classes" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "price" integer NOT NULL DEFAULT 0, "isDeleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_e207aa15404e9b2ce35910f9f7f" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "contracts" ADD CONSTRAINT "FK_17a246cb31bbb22248b31b08895" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_0d84b16e0ac645021378dfb170e" FOREIGN KEY ("carClassId") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_0d84b16e0ac645021378dfb170e"`, undefined);
        await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_17a246cb31bbb22248b31b08895"`, undefined);
        await queryRunner.query(`DROP TABLE "classes"`, undefined);
        await queryRunner.query(`DROP TABLE "cars"`, undefined);
        await queryRunner.query(`DROP TABLE "contracts"`, undefined);
    }

}
