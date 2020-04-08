import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeCarModelColumn1586334111926 implements MigrationInterface {
    name = 'ChangeCarModelColumn1586334111926'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "returnDateTime" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" RENAME COLUMN "model" TO "modelOld"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "returnDateTime" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" RENAME COLUMN "modelOld" TO "model"`);
    }

}
