import {Body, Controller, Get, Param, Post, Put} from "@nestjs/common";
import {ContractsService} from "./contracts.service";
import {Contract} from "../database/entities/contract.entity";
import {ShowContractDTO} from "../common/DTOs/show-contract.dto";

@Controller('contracts')
export class ContractsController {

    constructor(
        private readonly contractsService: ContractsService,
    ) {
    }

    @Get()
    async getOpenContracts(
    ): Promise<Contract[]> {
        return await this.contractsService.getOpen();
    }

    //Move car to Params
    @Post()
    public async createContract(
        @Body() body: any): Promise<ShowContractDTO> {
        return await this.contractsService.createContract(body);
    }

    //Move car to Params
    @Put(':id')
    public async returnCar(
        @Param('id') contractId: string,
        @Body() body: any): Promise<any>{
        return await this.contractsService.returnCar(contractId, body);
    }
}