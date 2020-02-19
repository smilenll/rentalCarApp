import {Controller, Get} from "@nestjs/common";
import {ContractsService} from "./contracts.service";
import {Contract} from "../database/entities/contract.entity";

@Controller('contracts')
export class ContractsController {

    constructor(
        private readonly contractsService: ContractsService,
    ) {
    }

    @Get()
    async getOpenContracts(
    ): Promise<Contract[]> {
        return await this.contractsService.getOpenContracts();
    }
}