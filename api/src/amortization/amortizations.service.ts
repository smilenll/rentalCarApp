import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Amortization} from "../database/entities/amortization.entity";
import {ShowAmortizationDTO} from "../common/DTOs/amortization/show-amortization.dto";
import {CreateAmortizationDTO} from "../common/DTOs/amortization/create-amortization.dto";
import Guard from "../common/utils/guard";

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

        Guard.exists(!findAmortization, `Amortization filter with name "${body.name}" all ready exist.`);
        Guard.should(((body.to - body.from) > 1), 'Range must be at leas one year');

        const amortization: any = await this.amortizationsRepository.create(body);

        return this.amortizationsRepository.save(amortization);
    }

    public async deleteAmortization(id: number): Promise<ShowAmortizationDTO> {
        const amortization: Amortization = await this.amortizationsRepository
            .findOne({where: {id, isDeleted:false}});

        Guard.exists(amortization, `'Amortization not found'`);
        amortization.isDeleted = true;

        return await this.amortizationsRepository.save(amortization);
    }
}