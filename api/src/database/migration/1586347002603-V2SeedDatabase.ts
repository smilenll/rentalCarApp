import {MigrationInterface, QueryRunner} from "typeorm";
import * as V2seed from "../seed/v2-seed.json";

export class SeedManufacturersAndModels1586347002603 implements MigrationInterface {
    name = 'SeedManufacturersAndModels1586347002603'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "returnDateTime" SET DEFAULT null`, undefined);
        await Promise.all(
            V2seed.manufacturers.map(async item =>
                await queryRunner.query(`INSERT INTO "manufacturers"
                    ("name") 
                    VALUES 
                    ('${item.name}')
                    RETURNING "id", "isDeleted"`)
            )
        );
        await Promise.all(
            V2seed.models.map(async item =>
                await queryRunner.query(`INSERT INTO "models"
                    ("name", "manufactureId" )
                    VALUES
                    ('${item.name}', '${item.manufacture}')
                    RETURNING "id", "isDeleted"`)
            )
        );
        await Promise.all(
            V2seed.cars.map(async item =>
                await queryRunner.query(`INSERT INTO "cars"
                    ("modelId", "img", "carClassId", "yearOfManufacture")
                    VALUES
                    ('${item.modelId}', '${item.image}', '${item.carClassId}', '${item.yearOFManufacture}')
                    RETURNING "id", "isDeleted"`)
            )
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "returnDateTime" DROP DEFAULT`, undefined);
    }
}
