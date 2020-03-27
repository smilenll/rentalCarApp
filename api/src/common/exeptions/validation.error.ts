import {SystemError} from "./system.error";

export class ValidationError extends SystemError {
    public constructor(message?: string) {
        super(message, 400);
    }
}