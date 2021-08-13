import BaseError from './baseError';
import { HttpStatusCode } from './config';

export default class APIError extends BaseError {
    constructor(name, httpCode = HttpStatusCode.INTERNAL_SERVER, isOperational = true,
        description = 'internal server error') {
        super(name, httpCode, isOperational, description);
        console.log('Error message : ', JSON.stringify({ name, httpCode, isOperational, description }));
    }
}