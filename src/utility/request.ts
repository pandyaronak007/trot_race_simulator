import * as request from 'request-promise';
import APIError from './apiError';
import { HttpStatusCode } from './config';

class Request {
    public option = {
        json: true,
        resolveWithFullResponse: true
    };

    // common file for api call
    async apiCall(options) {
        return request(options)
            .then(response => {
                if (response && response.body && response.statusCode) {
                    return { body: response.body, statusCode: response.statusCode };
                }
                return response;
            })
            .catch(err => {
                let message: string = null;
                if (err && err.statusCode && err.statusCode === HttpStatusCode.UNAUTHORIZED) {
                    message = 'Invalid credentials';
                    new APIError('UNAUTHORIZED', HttpStatusCode.UNAUTHORIZED, true, message);
                } else if (err && err.statusCode && err.statusCode === HttpStatusCode.SERVICE_UNAVAILABLE) {
                    message = 'Server is busy. This will happen if too many users are logged in simultaneously. Wait and try again.';
                    new APIError('SERVICE_UNAVAILABLE', HttpStatusCode.SERVICE_UNAVAILABLE, true, message);
                } else if (err && !err.statusCode) {
                    const errMessage = err && err.message ? err.message : err;
                    new APIError('NOT_FOUND', HttpStatusCode.NOT_FOUND, true, errMessage);
                }
                return err;
            });
    }

}

export default new Request();
