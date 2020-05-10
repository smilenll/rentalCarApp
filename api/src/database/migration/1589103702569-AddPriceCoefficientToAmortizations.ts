import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPriceCoefficientToAmortizations1589103702569 implements MigrationInterface {
    name = 'AddPriceCoefficientToAmortizations1589103702569'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "amortizations" ADD "priceCoefficient" double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "returnDateTime" SET DEFAULT null`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "returnDateTime" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "amortizations" DROP COLUMN "priceCoefficient"`, undefined);
    }

}
