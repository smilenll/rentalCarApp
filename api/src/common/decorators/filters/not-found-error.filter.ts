import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import {NotFoundError} from "../../exeptions/not-found.error";
import {SystemErrorFilter} from "./error.filter";


@Catch(NotFoundError)
export class NotFoundErrorFilter extends SystemErrorFilter implements ExceptionFilter {
    constructor() {
        super();
    }

    public catch(exception: NotFoundError, host: ArgumentsHost) {
        exception.code = 404;
        super.catch(exception, host)
    }
}
