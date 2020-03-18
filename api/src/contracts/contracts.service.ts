import {Contract} from "../database/entities/contract.entity";
import {getManager, Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ShowContractDTO} from "../common/DTOs/show-contract.dto";
import {Car} from "../database/entities/car.entity";
import {CloseContractDTO} from "../common/DTOs/close-contract.dto";
import {SystemError} from "../common/exeptions/system.error";
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

        contractEntity.car = this.changeCarStatus(contractEntity.car);

        return await getManager().transaction(async transactionalEntityManager => {

            await transactionalEntityManager.getRepository(Car).save(contractEntity.car);

            return await transactionalEntityManager.getRepository(Contract).save(contractEntity);
        });
    }

    public async returnCar(contractId:string,  body: { returnDateTime: Date }): Promise<CloseContractDTO> {
        this.validateData(body.returnDateTime);
        const contract = await this.contractsRepository.findOne(contractId);

        if(!contract) {
            throw new SystemError('Contract not found.', 400);
        }

        contract.returnDateTime = body.returnDateTime;
        contract.car = await this.changeCarStatus(contract.car);


        return await getManager().transaction(async transactionalEntityManager => {

            await transactionalEntityManager.getRepository(Car).save(contract.car);

            return await transactionalEntityManager.getRepository(Contract).save(contract);
        });
    }

    private changeCarStatus(car): Car {
        car.isFree = !car.isFree;

        return car;
    }

    private validateData(date: Date): void{

        const tenMinutes= 600000;
        const now = new Date().getTime();
        const returnDateTime = new Date(date).getTime();
        const differenceInTime = now - returnDateTime;
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