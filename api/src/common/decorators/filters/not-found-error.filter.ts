import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import {NotFoundError} from "../../exeptions/not-found.error";


@Catch(NotFoundError)
export class NotFoundErrorFilter implements ExceptionFilter {
    public catch(exception: NotFoundError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response.status(404).json({
            status: 404,
            error: exception.message,
        });
    }
}
