import {Contract} from "../database/entities/contract.entity";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ShowContractDTO} from "../common/DTOs/show-contract.dto";
import {Car} from "../database/entities/car.entity";

@Injectable()
export class ContractsService {
    constructor(
        @InjectRepository(Contract) private readonly contractsRepository: Repository<Contract>,
        @InjectRepository(Car) private readonly carsRepository: Repository<Car>,
    ) {}

    public async getOpen(): Promise<Contract[]> {
        return await this.contractsRepository.find();
    }

    public async createContract(body: any): Promise<ShowContractDTO> {

        const contractEntity: any = this.contractsRepository.create(body);

        contractEntity.car = await this.carsRepository.findOne(body.car);

        return await this.contractsRepository.save(contractEntity);
    }

    public async returnCar(contractId:string,  body: any): Promise<Contract> {

        const contract = await this.contractsRepository.findOne(contractId);
        contract.returnDateTime = body.returnDateTime;

        return await this.contractsRepository.save(contract);
    }
    //Calculate expected price for the contract
    public initialPrice(price: number, age: number, initialDate: string, expectReturnDate: string) {
        return 127.5;
    }
}