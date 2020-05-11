import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Car} from "../database/entities/car.entity";
import {ShowCarDTO} from "../common/DTOs/car/show-car.dto";
import Guard from "../common/utils/guard";

@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(Car) private readonly carsRepository: Repository<Car>,
    ) {}

    public async getCars(): Promise<ShowCarDTO[]> {

        return await this.carsRepository.find({ where: { isDeleted: false, isFree: true } });
    }

    public async getCarById(id: number): Promise<ShowCarDTO> {
        const car = await this.carsRepository
            .findOne({id, isFree: true, isDeleted: false});

        Guard.exists(car, `Contract with ID ${id} do not exist`);

        return car;
    }
}