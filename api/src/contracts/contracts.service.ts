import {Contract} from "../database/entities/contract.entity";
import {getManager, Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ShowContractDTO} from "../common/DTOs/contract/show-contract.dto";
import {Car} from "../database/entities/car.entity";
import {CloseContractDTO} from "../common/DTOs/contract/close-contract.dto";
import {ReturnCarDTO} from "../common/DTOs/car/return-car.dto";
import Guard from "../common/utils/guard";

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

        Guard.isDateCloseToNow(body.initialDateTime, 10, "Invalid date")
        Guard.isValidPeriod(body.initialDateTime, body.expectedReturnDateTime);


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

        Guard.isDateCloseToNow(body.returnDateTime, 10, "Invalid date")
        Guard.isValidPeriod(contract.initialDateTime, body.returnDateTime);

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

    // private validateData(date: Date): void{
    //
    //     Guard.isWithinPeriod({
    //         from: new Date(),
    //         to: date,
    //         value: moment().add(10, 'm').toDate(),
    //     })
    // }
}