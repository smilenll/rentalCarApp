import {MigrationInterface, QueryRunner} from "typeorm";

export class SeedPriceCoefficient1589103810743 implements MigrationInterface {
    name = 'SeedPriceCoefficient1589103810743'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "returnDateTime" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "returnDateTime" SET DEFAULT null`, undefined);
        await queryRunner.query(`UPDATE amortizations SET "priceCoefficient" = 1.2 WHERE "id" = 1`);
        await queryRunner.query(`UPDATE amortizations SET "priceCoefficient" = 1.1 WHERE "id" = 2`);
        await queryRunner.query(`UPDATE amortizations SET "priceCoefficient" = 1 WHERE "id" = 3`);
        await queryRunner.query(`UPDATE amortizations SET "priceCoefficient" = 0.8 WHERE "id" = 4`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "returnDateTime" DROP DEFAULT`, undefined);
    }

}
