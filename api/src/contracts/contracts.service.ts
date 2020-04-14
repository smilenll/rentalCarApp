import {Contract} from "../database/entities/contract.entity";
import {getManager, Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ShowContractDTO} from "../common/DTOs/contract/show-contract.dto";
import {Car} from "../database/entities/car.entity";
import {CloseContractDTO} from "../common/DTOs/contract/close-contract.dto";
import {NotFoundError} from "../common/exeptions/not-found.error";
import {ValidationError} from "../common/exeptions/validation.error";
import {ReturnCarDTO} from "../common/DTOs/car/return-car.dto";
import Guard from "../common/utils/Gurad"

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


        Guard.exists(contractEntity.car, "Incorrect car");

        this.validateData(body.initialDateTime);
        this.validatePeriod(body.initialDateTime, body.expectedReturnDateTime);

        contractEntity.car = this.changeCarStatus(contractEntity.car);


        return await getManager().transaction(async transactionalEntityManager => {
            await transactionalEntityManager.getRepository(Car).save(contractEntity.car);

            return await transactionalEntityManager.getRepository(Contract).save(contractEntity);
        });
    }

    public async returnCar(id: number,  body: ReturnCarDTO): Promise<CloseContractDTO> {

        const contract = await this.contractsRepository
            .findOne({id , returnDateTime: null, isDeleted: false});

        Guard.exists(contract, `Contract with ID ${id} do not exist`);        

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


        Guard.isWithinPeriod({
            from: new Date(),
            to: moment().add(30, 'm').toDate();
        })

        Guard.should(0 <= differenceInTime && differenceInTime <= tenMinutes,'Invalid date' );        
    }

    private validatePeriod(startDate: Date, endDate: Date): void{
        Guard.isValidPeriod(startDate, endDate);
    }
}