import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Car} from "../database/entities/car.entity";
import {ShowCarDTO} from "../common/DTOs/show-car.dto";
import {SystemError} from "../common/exeptions/system.error";

@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(Car) private readonly carsRepository: Repository<Car>,
    ) {}

    public async getCars(): Promise<ShowCarDTO[]> {
        const cars = await this.carsRepository.find({ where: { isDeleted: false, isFree: true } });

        if(!cars){
            throw new SystemError('Cars not found.', 404);
        }

        return cars
    }

    public async getCarById(id): Promise<ShowCarDTO> {

        const car = await this.carsRepository
            .findOne({id, isFree: true, isDeleted: false});

        if(!car){
            throw new SystemError('Car not found.', 404);
        }
        return car;
    }
}