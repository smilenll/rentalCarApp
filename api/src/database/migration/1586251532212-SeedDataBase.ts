import {MigrationInterface, QueryRunner} from "typeorm";
import * as seed from "../seed/seed.json"

export class SeedDataBase1586251532212 implements MigrationInterface {
    name = 'SeedDataBase1586251532212'

    public async up(queryRunner: QueryRunner): Promise<any> {
        const now = new Date().toISOString();
        const afterOneYearUnix = new Date().setFullYear(new Date().getFullYear() + 1);
        const afterOneYear = new Date (afterOneYearUnix).toISOString();

        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "returnDateTime" SET DEFAULT null`, undefined);
        await Promise.all(
            seed.carClasses.map(async item =>
                await queryRunner.query(`INSERT INTO "carclasses"
                    ("id", "name", "price", "isDeleted") 
                    VALUES 
                    (DEFAULT, '${item.name}', ${item.price}, DEFAULT)
                    RETURNING "id", "isDeleted"`)
            )
        );
        await Promise.all(
            seed.cars.map(async item =>
                await queryRunner.query(`INSERT INTO "cars"
                    ("model", "img", "carClassId", "isFree") 
                    VALUES 
                    ('${item.model}', '${item.img}', '${item.carClass}', '${item.isFree}')
                    RETURNING "id", "isDeleted"`)
            )
        );
        await Promise.all(
            seed.contracts.map(async item =>
                await queryRunner.query(`INSERT INTO "contracts"
                    ("firstName", "lastName", "age", "initialDateTime", "expectedReturnDateTime", "carId") 
                    VALUES 
                    ('${item.firstName}', '${item.lastName}', '${item.age}', '${now}', '${afterOneYear}', '${item.car}')
                    RETURNING "id", "isDeleted"`)
            )
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "returnDateTime" DROP DEFAULT`, undefined);
    }

}
