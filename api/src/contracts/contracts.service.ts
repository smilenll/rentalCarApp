import {Contract} from "../database/entities/contract.entity";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ShowContractDTO} from "../common/DTOs/show-contract.dto";
import {Car} from "../database/entities/car.entity";
import {CloseContractDTO} from "../common/DTOs/close-contract.dto";
import {SystemError} from "../common/exeptions/system.error";
import {CreateContractDTO} from "../common/DTOs/create-contract.dto";

@Injectable()
export class ContractsService {
    constructor(
        @InjectRepository(Contract) private readonly contractsRepository: Repository<Contract>,
        @InjectRepository(Car) private readonly carsRepository: Repository<Car>,
    ) {}

    public async getOpenContracts(): Promise<ShowContractDTO[]> {
        const contracts: ShowContractDTO[] = await this.contractsRepository
            .find({ where: { isDeleted: false, returnDateTime: null } });

        if(!contracts) {
            throw new SystemError('Contracts not found.', 404);
        }

        return contracts;
    }

    // Change type
    public async createContract(body: any): Promise<ShowContractDTO> {
        const contractEntity: any = this.contractsRepository.create(body);
        contractEntity.car = await this.carsRepository
            .findOne({id: body.car, isFree: true, isDeleted: false});

        if(!contractEntity.car) {
            throw new SystemError('Car not found.', 400);
        }

        this.validateData(body.initialDate);

        this.validatePeriod(body.initialDate, body.expectedReturnDate);

        await this.changeCarStatus(contractEntity.car.id);

        return await this.contractsRepository.save(contractEntity);
    }

    public async returnCar(contractId:string,  body: { returnDateTime: string }): Promise<CloseContractDTO> {
        this.validateData(body.returnDateTime);
        const contract = await this.contractsRepository.findOne(contractId);

        if(!contract) {
            throw new SystemError('Contract not found.', 400);
        }

        contract.returnDateTime = body.returnDateTime;
        await this.changeCarStatus(contract.car.id);

        return await this.contractsRepository.save(contract);
    }

    private async changeCarStatus(id): Promise<Car> {
        const car = await this.carsRepository.findOne(id);
        car.isFree = !car.isFree;

        return await this.carsRepository.save(car);
    }

    private validateData(date: string): void{

        const tenMinutes= 600000;
        const now = new Date().getTime();
        const returnDate = new Date(date).getTime();
        const differenceInTime = now - returnDate;
        if(differenceInTime < 0) {
            throw new SystemError('This is a call from the future.', 400);
        }
        if(differenceInTime > tenMinutes) {
            throw new SystemError('Invalid data', 400);
        }
    }

    private validatePeriod(startDate: string, endDate: string): void{

        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        const differenceInTime = end - start;
        if(differenceInTime < 0) {
            throw new SystemError('Incorrect return date ', 400);
        }
    }
}