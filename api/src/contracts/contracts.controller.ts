import {Body, Controller, Get, Param, Post, Put, UseFilters, UseInterceptors, ValidationPipe} from "@nestjs/common";
import {ContractsService} from "./contracts.service";
import {ShowContractDTO} from "../common/DTOs/show-contract.dto";
import {TransformInterceptor} from "../common/interseptors/transform.interseptor";
import {CreateContractDTO} from "../common/DTOs/create-contract.dto";
import {CloseContractDTO} from "../common/DTOs/close-contract.dto";
import {SystemErrorFilter} from "../common/decorators/filters/error.filter";
import {NotFoundErrorFilter} from "../common/decorators/filters/not-found-error.filter";
import {ValidationErrorFilter} from "../common/decorators/filters/validation-error.filter";

@Controller('contracts')
export class ContractsController {

    constructor(
        private readonly contractsService: ContractsService,
    ) {}

    @Get()
    @UseFilters(SystemErrorFilter, NotFoundErrorFilter, ValidationErrorFilter)
    @UseInterceptors(new TransformInterceptor(ShowContractDTO))
    async getOpenContracts(): Promise<ShowContractDTO[]> {

        return await this.contractsService.getOpenContracts();
    }

    @Post()
    @UseFilters(SystemErrorFilter)
    @UseInterceptors(new TransformInterceptor(ShowContractDTO))
    public async createContract(
        @Body(new ValidationPipe({
            transform: true,
            whitelist: true,
        })) body: CreateContractDTO): Promise<ShowContractDTO> {

        return await this.contractsService.createContract(body);
    }

    @Put(':id')
    @UseFilters(SystemErrorFilter)
    @UseInterceptors(new TransformInterceptor(CloseContractDTO))
    public async returnCar(
        @Param('id') contractId: string,
        @Body() body: any): Promise<CloseContractDTO> {

        return await this.contractsService.returnCar(contractId, body);
    }
}