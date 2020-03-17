import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { ValidationError } from "../../exeptions/validation.error";


@Catch(ValidationError)
export class ValidationErrorFilter implements ExceptionFilter {
    public catch(exception: ValidationError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response.status(400).json({
            status: 400,
            error: exception.message,
        });
    }
}
