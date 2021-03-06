import {Controller, Get, Param, ParseIntPipe, UseFilters, UseInterceptors, ValidationPipe} from "@nestjs/common";
import {CarsService} from "./cars.service";
import {ShowCarDTO} from "../common/DTOs/car/show-car.dto";
import {TransformInterceptor} from "../common/interseptors/transform.interseptor";

@Controller('cars')
export class CarsController {

    constructor(
        private readonly carsService: CarsService,
    ) {
    }

    @Get()
    @UseInterceptors(new TransformInterceptor(ShowCarDTO))
    async getCars(): Promise<ShowCarDTO[]> {

        return await this.carsService.getCars();
    }

    @Get(':id')
    @UseInterceptors(new TransformInterceptor(ShowCarDTO))
    async getCarById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ShowCarDTO> {

        return await this.carsService.getCarById(id);
    }
}