import {Body, Controller, Get, Param, Post, Put, UseFilters, UseInterceptors, ValidationPipe} from "@nestjs/common";
import {ContractsService} from "./contracts.service";
import {ShowContractDTO} from "../common/DTOs/show-contract.dto";
import {TransformInterceptor} from "../common/interseptors/transform.interseptor";
import {CreateContractDTO} from "../common/DTOs/create-contract.dto";
import {CloseContractDTO} from "../common/DTOs/close-contract.dto";
import {ParamDTO} from "../common/DTOs/param.dto";

@Controller('contracts')
export class ContractsController {

    constructor(
        private readonly contractsService: ContractsService,
    ) {}

    @Get()
    @UseInterceptors(new TransformInterceptor(ShowContractDTO))
    async getOpenContracts(): Promise<ShowContractDTO[]> {

        return await this.contractsService.getOpenContracts();
    }

    @Post()
    @UseInterceptors(new TransformInterceptor(ShowContractDTO))
    public async createContract(
        @Body(new ValidationPipe({
            transform: true,
            whitelist: true,
        })) body: CreateContractDTO): Promise<ShowContractDTO> {

        return await this.contractsService.createContract(body);
    }

    @Put(':id')
    @UseInterceptors(new TransformInterceptor(CloseContractDTO))
    public async returnCar(
        @Param('id',new ValidationPipe({
            transform: true,
            whitelist: true,
        })) contractId: ParamDTO,
        @Body() body: any): Promise<ShowContractDTO> {

        return await this.contractsService.returnCar(contractId, body);
    }
}