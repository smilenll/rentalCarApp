import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Amortization} from "../database/entities/amortization.entity";
import {ShowAmortizationDTO} from "../common/DTOs/amortization/show-amortization.dto";
import {CreateAmortizationDTO} from "../common/DTOs/amortization/create-amortization.dto";
import {ValidationError} from "../common/exeptions/validation.error";
import {NotFoundError} from "../common/exeptions/not-found.error";

@Injectable()
export class AmortizationsService {
    constructor(
        @InjectRepository(Amortization) private readonly amortizationsRepository: Repository<Amortization>,
    ) {}

    public async getAmortizations(): Promise<ShowAmortizationDTO[]> {

        return await this.amortizationsRepository.find({ where: { isDeleted: false } });
    }

    public async createAmortization(body: CreateAmortizationDTO): Promise<ShowAmortizationDTO> {

        const findAmortization = await this.amortizationsRepository.findOne({where: { name: body.name}})

        if (findAmortization) {
            throw new ValidationError('Amortization filter with this name all ready exist.');
        }

        if((body.to - body.from) < 1){
            throw new ValidationError('Range must be at leas one year');
        }

        const amortization: any = await this.amortizationsRepository.create(body);

        return this.amortizationsRepository.save(amortization);
    }

    public async deleteAmortization(id: number): Promise<ShowAmortizationDTO> {
        const amortization: Amortization = await this.amortizationsRepository
            .findOne({where: {id, isDeleted:false}});
        if(!amortization){
            throw new NotFoundError('Amortization not found')
        }
        amortization.isDeleted = true;

        return await this.amortizationsRepository.save(amortization);
    }
}