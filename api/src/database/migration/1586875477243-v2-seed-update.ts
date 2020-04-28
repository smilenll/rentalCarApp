import {MigrationInterface, QueryRunner} from "typeorm";
import * as V2seed from "../seed/v2-seed.json";

export class v2SeedUpdate1586875477243 implements MigrationInterface {
    name = 'v2SeedUpdate1586875477243'

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
                    ("name", "carClassId", "manufactureId" )
                    VALUES
                    ('${item.name}','${item.carClassId}', '${item.manufacture}')
                    RETURNING "id", "isDeleted"`)
            )
        );
        await queryRunner.query(`UPDATE cars SET "modelId" = 9, "yearOfManufacture" = 2020 WHERE "id" = 1`);
        await queryRunner.query(`UPDATE cars SET "modelId" = 10, "yearOfManufacture" = 2020 WHERE "id" = 2`);
        await queryRunner.query(`UPDATE cars SET "modelId" = 11, "yearOfManufacture" = 2016 WHERE "id" = 3`);
        await queryRunner.query(`UPDATE cars SET "modelId" = 12, "yearOfManufacture" = 2020 WHERE "id" = 4`);
        await queryRunner.query(`UPDATE cars SET "modelId" = 13, "yearOfManufacture" = 2020 WHERE "id" = 5`);
        await queryRunner.query(`UPDATE cars SET "modelId" = 14, "yearOfManufacture" = 2020 WHERE "id" = 6`);
        await queryRunner.query(`UPDATE cars SET "modelId" = 15, "yearOfManufacture" = 2018 WHERE "id" = 7`);
        await queryRunner.query(`UPDATE cars SET "modelId" = 15, "yearOfManufacture" = 2018 WHERE "id" = 8`);
        await queryRunner.query(`UPDATE cars SET "modelId" = 9, "yearOfManufacture" = 2018 WHERE "id" = 9`);

        await Promise.all(
            V2seed.cars.map(async item =>
                await queryRunner.query(`INSERT INTO "cars"
                    ("modelId", "img", "yearOfManufacture")
                    VALUES
                    ('${item.modelId}', '${item.image}', '${item.yearOFManufacture}')
                    RETURNING "id", "isDeleted"`)
            )
        );

        await Promise.all(
            V2seed.amortizations.map(async item =>
                await queryRunner.query(`INSERT INTO "amortizations"
                    ("name", "from", "to")
                    VALUES
                    ('${item.name}', '${item.from}', '${item.until}')
                    RETURNING "id", "isDeleted"`)
            )
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "returnDateTime" DROP DEFAULT`, undefined);
    }

}
