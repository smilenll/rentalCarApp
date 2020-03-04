import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Car} from "../database/entities/car.entity";
import {ShowCarDTO} from "../common/DTOs/show-car.dto";

@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(Car) private readonly carsRepository: Repository<Car>,
    ) {}

    public async getCars(): Promise<ShowCarDTO[]> {
        return await this.carsRepository.find();
    }

}