export class ValidationError extends Error {
    public constructor(message?: string) {
        super(message);
    }
}
