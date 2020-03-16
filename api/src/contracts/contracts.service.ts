import {Contract} from "../database/entities/contract.entity";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ShowContractDTO} from "../common/DTOs/show-contract.dto";
import {Car} from "../database/entities/car.entity";
import {CloseContractDTO} from "../common/DTOs/close-contract.dto";
import {SystemError} from "../common/exeptions/system.error";

@Injectable()
export class ContractsService {
    constructor(
        @InjectRepository(Contract) private readonly contractsRepository: Repository<Contract>,
        @InjectRepository(Car) private readonly carsRepository: Repository<Car>,
    ) {}

    public async getOpenContracts(): Promise<ShowContractDTO[]> {
        return await this.contractsRepository.find({ where: { isDeleted: false, returnDateTime: null } });
    }

    public async createContract(body: any): Promise<ShowContractDTO> {

        const contractEntity: any = this.contractsRepository.create(body);
        contractEntity.car = await this.carsRepository.findOne(body.car);
        await this.changeCarStatus(contractEntity.car.id);

        return await this.contractsRepository.save(contractEntity);
    }

    public async returnCar(contractId:string,  body: { returnDateTime: Date }): Promise<CloseContractDTO> {
        this.validateData(body.returnDateTime);
        const contract = await this.contractsRepository.findOne(contractId);
        contract.returnDateTime = body.returnDateTime;
        await this.changeCarStatus(contract.car.id);

        return await this.contractsRepository.save(contract);
    }

    private async changeCarStatus(id): Promise<Car> {
        const car = await this.carsRepository.findOne(id);
        car.isFree = !car.isFree;
        return await this.carsRepository.save(car);
    }

    private validateData(date: Date): void{

        const tenMinutes= 600000;
        const now = new Date().getTime();
        const returnDate = new Date(date).getTime();
        const differenceInTime = now - returnDate;
        if(differenceInTime < 0) {
            throw new SystemError('This is a call from the future.', 404);
        }
        if(differenceInTime > tenMinutes) {
            throw new SystemError('Session expired', 404);
        }
    }
}