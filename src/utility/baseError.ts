import { HttpStatusCode } from './config';

// created error main function for further error enhancement
export default class BaseError extends Error {
    public readonly name: string;
    public readonly httpCode: HttpStatusCode;
    public readonly isOperational: boolean;

    constructor(name: string, httpCode: HttpStatusCode, isOperational: boolean, description: string) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this);
    }
}