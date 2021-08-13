import restCall from './rest.service';
import eventService from './event.service';
import APIError from '../utility/apiError';
import { HttpStatusCode } from '../utility/config';

class Simulator {

    // start of main function for simulator
    async start() {
        restCall.resultApi()
            .then(result => {
                console.log('result', result.statusCode, JSON.stringify(result.body));
                if (result && result.statusCode && result.statusCode === HttpStatusCode.OK) {
                    return eventService.create(result.body);
                } else if (result && result.statusCode && result.statusCode === HttpStatusCode.SERVICE_UNAVAILABLE) {
                    this.start();
                }
            })
            .catch(err => {
                const errMessage = err && err.message ? err.message : err;
                new APIError('NOT_FOUND', HttpStatusCode.NOT_FOUND, true, errMessage);
                return err;
            });
    }

}

export default new Simulator();