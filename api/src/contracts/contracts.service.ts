import {Contract} from "../database/entities/contract.entity";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ShowContractDTO} from "../common/DTOs/show-contract.dto";
import {Car} from "../database/entities/car.entity";
import {CloseContractDTO} from "../common/DTOs/close-contract.dto";
import {CreateContractDTO} from "../common/DTOs/create-contract.dto";
import {NotFoundError} from "../common/exeptions/not-found.error";
import {ValidationError} from "../common/exeptions/validation.error";

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
            throw new NotFoundError('Contracts not found.');
        }

        return contracts;
    }

    public async createContract(body: any): Promise<ShowContractDTO> {
        const contractEntity: any = this.contractsRepository.create(body);
        contractEntity.car = await this.carsRepository
            .findOne({id: body.car, isFree: true, isDeleted: false});

        if(!contractEntity.car) {
            throw new ValidationError('Incorrect car');
        }

        this.validateData(body.initialDate);

        this.validatePeriod(body.initialDate, body.expectedReturnDate);

        await this.changeCarStatus(contractEntity.car.id);

        return await this.contractsRepository.save(contractEntity);
    }

    public async returnCar(contractId:number,  body: { returnDateTime: Date }): Promise<CloseContractDTO> {
        this.validateData(body.returnDateTime);
        const contract = await this.contractsRepository.findOne(contractId);

        if(!contract) {
            throw new NotFoundError(`Contract with id ${contractId}`);
        }

        contract.returnDateTime = body.returnDateTime;
        await this.changeCarStatus(contract.car.id);

        return contract;
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
            throw new ValidationError('Invalid date');
        }
        if(differenceInTime > tenMinutes) {
            throw new ValidationError('Invalid date');
        }
    }

    private validatePeriod(startDate: string, endDate: string): void{

        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        const differenceInTime = end - start;
        if(differenceInTime < 0) {
            throw new ValidationError('Incorrect return date ');
        }
    }
}