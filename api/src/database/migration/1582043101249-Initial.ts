import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1582043101249 implements MigrationInterface {
    name = 'Initial1582043101249'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "title" character varying(200) NOT NULL, "description" character varying(2000) NOT NULL, "img" character varying, "allLikes" integer NOT NULL DEFAULT 0, "isPublic" boolean NOT NULL DEFAULT true, "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "posts"`, undefined);
    }

}
