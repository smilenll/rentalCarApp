import {Contract} from "../database/entities/contract.entity";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ContractsService {
    constructor(
        @InjectRepository(Contract) private readonly contractsRepository: Repository<Contract>,
    ) {}

    public async getOpenContracts(): Promise<Contract[]> {
        return await this.contractsRepository.find({ where: { name: { first: "Timber", last: "Saw" } } });
    }

}