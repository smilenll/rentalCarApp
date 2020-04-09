import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UseInterceptors,
    ValidationPipe
} from "@nestjs/common";
import {AmortizationsService} from "./amortizations.service";
import {TransformInterceptor} from "../common/interseptors/transform.interseptor";
import {ShowAmortizationDTO} from "../common/DTOs/amortization/show-amortization.dto";
import {CreateAmortizationDTO} from "../common/DTOs/amortization/create-amortization.dto";

@Controller('amortizations')
export class AmortizationsController {

    constructor(
        private readonly amortizationsService: AmortizationsService,
    ) {
    }

    @Get()
    @UseInterceptors(new TransformInterceptor(ShowAmortizationDTO))
    async getAmortizations(): Promise<ShowAmortizationDTO[]> {

        return await this.amortizationsService.getAmortizations();
    }

    @Post()
    @UseInterceptors(new TransformInterceptor(ShowAmortizationDTO))
    public async createAmortization(
        @Body(new ValidationPipe({
            transform: true,
            whitelist: true,
        })) body: CreateAmortizationDTO): Promise<ShowAmortizationDTO> {

        return await this.amortizationsService.createAmortization(body);
    }

    @Delete(':id')
    @UseInterceptors(new TransformInterceptor(ShowAmortizationDTO))
    public async deleteAmortization(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ShowAmortizationDTO> {
        return await this.amortizationsService.deleteAmortization(id);
    }
}