import {Contract} from "../database/entities/contract.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {ContractsController} from "./contracts.controller";
import {ContractsService} from "./contracts.service";
import {Car} from "../database/entities/car.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Contract, Car]),
    ],
    controllers: [ContractsController],
    providers: [ContractsService],
})
export class ContractsModule {}