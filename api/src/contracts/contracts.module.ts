import {Contract} from "../database/entities/contract.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {ContractsController} from "./contracts.controller";
import {ContractsService} from "./contracts.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Contract]),
    ],
    controllers: [ContractsController],
    providers: [ContractsService],
})
export class ContractsModule {}