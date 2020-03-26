import {Contract} from "../database/entities/contract.entity";
import {getManager, Repository} from "typeorm";
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

        return await this.contractsRepository
            .find({ where: { isDeleted: false, returnDateTime: null } });
    }

    public async createContract(body: any): Promise<ShowContractDTO> {
        const contractEntity: any = this.contractsRepository.create(body);
        contractEntity.car = await this.carsRepository
            .findOne({id: body.car, isFree: true, isDeleted: false});

        if(!contractEntity.car) {
            throw new ValidationError('Incorrect car');
        }

        this.validateData(body.initialDateTime);
        this.validatePeriod(body.initialDateTime, body.expectedReturnDateTime);

        contractEntity.car = this.changeCarStatus(contractEntity.car);

        return await getManager().transaction(async transactionalEntityManager => {

            await transactionalEntityManager.getRepository(Car).save(contractEntity.car);

            return await transactionalEntityManager.getRepository(Contract).save(contractEntity);
        });
    }

    public async returnCar(contractId:number,  body: { returnDateTime: Date }): Promise<CloseContractDTO> {

        const contract = await this.contractsRepository
            .findOne({id: contractId, returnDateTime: null, isDeleted: false});

        if(!contract) {
            throw new NotFoundError(`Contract with ID ${contractId} do not exist`);
        }

        this.validateData(body.returnDateTime);
        this.validatePeriod(contract.initialDateTime, body.returnDateTime);

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
        const initialDateTime = new Date(date).getTime();
        const differenceInTime = now - initialDateTime;

        if(differenceInTime < 0) {
            throw new ValidationError('Invalid date');
        }
        if(differenceInTime > tenMinutes) {
            throw new ValidationError('Invalid date');
        }
    }

    private validatePeriod(startDate: Date, endDate: Date): void{

        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        const differenceInTime = end - start;

        if(differenceInTime < 0) {
            throw new ValidationError('Incorrect return date ');
        }
    }
}