import {SystemError} from "./system.error";

export class NotFoundError extends SystemError {
    public constructor(message?: string) {
        super(message, 404);
    }
}