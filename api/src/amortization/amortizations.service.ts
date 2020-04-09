import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Amortization} from "../database/entities/amortization.entity";
import {ShowAmortizationDTO} from "../common/DTOs/amortization/show-amortization.dto";
import {CreateAmortizationDTO} from "../common/DTOs/amortization/create-amortization.dto";
import {ValidationError} from "../common/exeptions/validation.error";

@Injectable()
export class AmortizationsService {
    constructor(
        @InjectRepository(Amortization) private readonly amortizationsRepository: Repository<Amortization>,
    ) {}

    // public async getCars(): Promise<ShowCarDTO[]> {
    //     return await this.carsRepository.find({ where: { isDeleted: false, isFree: true } });
    // }

    public async createAmortization(body: CreateAmortizationDTO): Promise<ShowAmortizationDTO> {
        if((body.to - body.from) < 1){
            throw new ValidationError('Range must be at leas one year');
        }
        const amortization: any = await this.amortizationsRepository.create(body);

        return this.amortizationsRepository.save(amortization);
    }
}