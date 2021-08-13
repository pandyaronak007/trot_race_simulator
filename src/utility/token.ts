import * as NodeCache from 'node-cache';
import restCall from '../service/rest.service';

const myCache = new NodeCache();

class Token {

    // generate token for api and compare token is valid or not
    async validateToken() {
        let bearerToken: any = myCache.has('token') ? myCache.get('token') : null;
        if (bearerToken &&
            bearerToken.token !== null &&
            bearerToken.time !== null &&
            Math.round(Math.abs(Date.now() - bearerToken.time) / 1000) < 300) {
            return bearerToken;
        } else {
            bearerToken = await restCall.authApi();
            myCache.set('token', bearerToken.body);
            return bearerToken.body;
        }
    }

}

export default new Token();