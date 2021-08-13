import * as NodeCache from 'node-cache';
import request from '../utility/request';
import token from '../utility/token';
import { apiUrl, httpMethod, HttpStatusCode } from '../utility/config';

const myCache = new NodeCache();

class RestCall {

    // call authorization api for user validation
    async authApi() {
        // set api call extra options
        const options = {
            method: httpMethod.post,
            uri: `${process.env.SERVER}/${apiUrl.auth}`,
            body: {
                email: `${process.env.USER_EMAIL}`,
                password: `${process.env.USER_PASSWORD}`
            },
        };

        // call common api request
        return await request.apiCall({ ...options, ...request.option })
            .then(response => {
                if (response && response.body) {
                    response.body.time = Date.now();
                }
                if (response && response.statusCode === HttpStatusCode.UNAUTHORIZED && myCache.has('token')) {
                    myCache.del('token');
                }
                return response;
            });
    }

    // call result api for event details
    async resultApi() {
        // check bearer token is valid or not
        const bearerToken = await token.validateToken();
        if (bearerToken && bearerToken.token) {
            // set api call extra options
            const options = {
                uri: `${process.env.SERVER}/${apiUrl.results}`,
                headers: { Authorization: `Bearer ${bearerToken.token}` },
                timeout: 15000
            };
            // call common api request
            return await request.apiCall({ ...options, ...request.option })
                .then(async response => {
                    if (response && response.statusCode === HttpStatusCode.NO_CONTENT) {
                        const getToken = await this.authApi();
                        if (getToken && getToken.body) {
                            myCache.set('token', getToken.body);
                        }
                        this.resultApi();
                    }
                    return response;
                });
        }
    }

}

export default new RestCall();