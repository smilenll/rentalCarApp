import {Contract} from "../database/entities/contract.entity";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ShowContractDTO} from "../common/DTOs/show-contract.dto";

@Injectable()
export class ContractsService {
    constructor(
        @InjectRepository(Contract) private readonly contractsRepository: Repository<Contract>,
    ) {}

    public async getOpen(): Promise<Contract[]> {
        return await this.contractsRepository.find();
    }

    public async createContract(body: any): Promise<ShowContractDTO> {

        const contractEntity: any = this.contractsRepository.create(body);

        return await this.contractsRepository.save(contractEntity);
    }
    //Calculate expected price for the contract
    public initialPrice(price: number, age: number, initialDate: string, expectReturnDate: string) {
        return 127.5;
    }

}