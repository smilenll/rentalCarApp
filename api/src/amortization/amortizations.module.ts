import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {AmortizationsController} from "./amortizations.controller";
import {AmortizationsService} from "./amortizations.service";
import {Amortization} from "../database/entities/amortization.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Amortization]),
    ],
    controllers: [AmortizationsController],
    providers: [AmortizationsService],
})
export class CarsModule {}