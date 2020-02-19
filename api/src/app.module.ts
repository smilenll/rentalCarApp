import {Global, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {DatabaseModule} from "./database/database.module";
// import {CoreModule} from "./common/core.module";
import {ConfigModule} from "./config/config.module";
import {CoreModule} from "./common/core.module";

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }