import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Car} from "../database/entities/car.entity";
import {ShowCarDTO} from "../common/DTOs/show-car.dto";
import {NotFoundError} from "../common/exeptions/not-found.error";

@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(Car) private readonly carsRepository: Repository<Car>,
    ) {}

    public async getCars(): Promise<ShowCarDTO[]> {

        return await this.carsRepository.find({ where: { isDeleted: false, isFree: true } });
    }

    public async getCarById(id): Promise<ShowCarDTO> {

        const car = await this.carsRepository
            .findOne({id, isFree: true, isDeleted: false});

        if(!car){
            throw new NotFoundError(`Car with  id ${id} not found`);
        }
        return car;
    }
}