import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as bodyParser from 'body-parser';
import {SystemErrorFilter} from "./common/decorators/filters/error.filter";
import {join} from "path";
import {NestExpressApplication} from "@nestjs/platform-express";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/public' });
    app.useGlobalFilters(new SystemErrorFilter);
    app.setGlobalPrefix('api');
    app.enableCors();
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

    await app.listen(4000);
}

bootstrap();
