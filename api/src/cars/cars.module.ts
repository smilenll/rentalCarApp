import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {Car} from "../database/entities/car.entity";
import {CarsController} from "./cars.controller";
import {CarsService} from "./cars.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Car]),
    ],
    controllers: [CarsController],
    providers: [CarsService],
})
export class CarsModule {}