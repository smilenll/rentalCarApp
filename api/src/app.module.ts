import {Global, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DatabaseModule} from "./database/database.module";
import {ContractsModule} from "./contracts/contracts.module";
import {CarsModule} from "./cars/cars.module";

@Module({
    imports: [
        DatabaseModule,
        ContractsModule,
        CarsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}