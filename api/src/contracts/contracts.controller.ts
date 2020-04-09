import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseFilters,
    UseInterceptors,
    ValidationPipe
} from "@nestjs/common";
import {ContractsService} from "./contracts.service";
import {ShowContractDTO} from "../common/DTOs/contract/show-contract.dto";
import {TransformInterceptor} from "../common/interseptors/transform.interseptor";
import {CreateContractDTO} from "../common/DTOs/contract/create-contract.dto";
import {CloseContractDTO} from "../common/DTOs/contract/close-contract.dto";
import {ReturnCarDTO} from "../common/DTOs/car/return-car.dto";

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
        @Param('id', ParseIntPipe) contractId: number,
        @Body() body: ReturnCarDTO): Promise<ShowContractDTO> {

        return await this.contractsService.returnCar(contractId, body);
    }
}