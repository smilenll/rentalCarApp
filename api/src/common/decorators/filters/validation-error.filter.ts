import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { ValidationError } from "../../exeptions/validation.error";
import {SystemErrorFilter} from "./error.filter";


@Catch(ValidationError)
export class ValidationErrorFilter extends SystemErrorFilter implements ExceptionFilter {

    constructor() {
        super();
    }

    public catch(exception: ValidationError, host: ArgumentsHost) {
        exception.code = 400;
        super.catch(exception, host)
    }
}
