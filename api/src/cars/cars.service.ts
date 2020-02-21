import {Contract} from "../database/entities/contract.entity";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Car} from "../database/entities/car.entity";

@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(Car) private readonly contractsRepository: Repository<Car>,
    ) {}

    public async getOpenContracts(): Promise<Car[]> {
        return await this.contractsRepository.find({ where: { name: { first: "Timber", last: "Saw" } } });
    }

}