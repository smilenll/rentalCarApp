import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Car} from "../database/entities/car.entity";
import {ShowCarDTO} from "../common/DTOs/show-car.dto";
import {NotFoundError} from "../common/exeptions/not-found.error";
import {ParamDTO} from "../common/DTOs/param.dto";

@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(Car) private readonly carsRepository: Repository<Car>,
    ) {}

    public async getCars(): Promise<ShowCarDTO[]> {
        const cars = await this.carsRepository.find({ where: { isDeleted: false, isFree: true } });
        return
    }

    public async getCarById(params: ParamDTO): Promise<ShowCarDTO> {

        const car = await this.carsRepository
            .findOne({id:params.id, isFree: true, isDeleted: false});

        if(!car){
            throw new NotFoundError(`Car with  id ${params.id} not found`);
        }
        return car;
    }

    private updateCarToV2(V1Car) {

    }
}