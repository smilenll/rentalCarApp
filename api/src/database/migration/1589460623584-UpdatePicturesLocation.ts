import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatePicturesLocation1589460623584 implements MigrationInterface {
    name = 'UpdatePicturesLocation1589460623584'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "returnDateTime" SET DEFAULT null`, undefined);
        await queryRunner.query(`UPDATE cars SET "img" = 2 WHERE "id" = 1`);
        await queryRunner.query(`UPDATE cars SET "img" = 11 WHERE "id" = 2`);
        await queryRunner.query(`UPDATE cars SET "img" = 12 WHERE "id" = 3`);
        await queryRunner.query(`UPDATE cars SET "img" = 13 WHERE "id" = 4`);
        await queryRunner.query(`UPDATE cars SET "img" = 14 WHERE "id" = 5`);
        await queryRunner.query(`UPDATE cars SET "img" = 15 WHERE "id" = 6`);
        await queryRunner.query(`UPDATE cars SET "img" = 1 WHERE "id" = 7`);
        await queryRunner.query(`UPDATE cars SET "img" = 1 WHERE "id" = 8`);
        await queryRunner.query(`UPDATE cars SET "img" = 2 WHERE "id" = 9`);
        await queryRunner.query(`UPDATE cars SET "img" = 3 WHERE "id" = 10`);
        await queryRunner.query(`UPDATE cars SET "img" = 4 WHERE "id" = 11`);
        await queryRunner.query(`UPDATE cars SET "img" = 5 WHERE "id" = 12`);
        await queryRunner.query(`UPDATE cars SET "img" = 6 WHERE "id" = 13`);
        await queryRunner.query(`UPDATE cars SET "img" = 7 WHERE "id" = 14`);
        await queryRunner.query(`UPDATE cars SET "img" = 8 WHERE "id" = 15`);
        await queryRunner.query(`UPDATE cars SET "img" = 16 WHERE "id" = 16`);
        await queryRunner.query(`UPDATE cars SET "img" = 9 WHERE "id" = 17`);
        await queryRunner.query(`UPDATE cars SET "img" = 10 WHERE "id" = 18`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "returnDateTime" DROP DEFAULT`, undefined);
    }

}
