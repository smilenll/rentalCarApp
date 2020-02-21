import {Controller, Get} from "@nestjs/common";
import {CarsService} from "./cars.service";
import {Car} from "../database/entities/car.entity";

@Controller('cars')
export class CarsController {

    constructor(
        private readonly contractsService: CarsService,
    ) {
    }

    @Get()
    async getCars(
    ): Promise<Car[]> {
        return await this.contractsService.getOpenContracts();
    }
}