import {Controller, Get, Param, UseFilters, UseInterceptors} from "@nestjs/common";
import {CarsService} from "./cars.service";
import {ShowCarDTO} from "../common/DTOs/show-car.dto";
import {TransformInterceptor} from "../common/interseptors/transform.interseptor";
import {SystemErrorFilter} from "../common/decorators/filters/error.filter";
import {NotFoundErrorFilter} from "../common/decorators/filters/not-found-error.filter";

@Controller('cars')
export class CarsController {

    constructor(
        private readonly carsService: CarsService,
    ) {
    }

    @Get()
    @UseFilters(NotFoundErrorFilter)
    @UseInterceptors(new TransformInterceptor(ShowCarDTO))
    async getCars(): Promise<ShowCarDTO[]> {

        return await this.carsService.getCars();
    }

    @Get(':id')
    @UseFilters(NotFoundErrorFilter)
    @UseInterceptors(new TransformInterceptor(ShowCarDTO))
    async getCarById(
        @Param('id') carId: number
    ): Promise<ShowCarDTO> {

        return await this.carsService.getCarById(carId);
    }
}