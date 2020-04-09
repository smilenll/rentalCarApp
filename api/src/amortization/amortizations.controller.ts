import {Controller} from "@nestjs/common";
import {AmortizationsService} from "./amortizations.service";

@Controller('amortizations')
export class AmortizationsController {

    constructor(
        private readonly amortizationsServices: AmortizationsService,
    ) {
    }

}