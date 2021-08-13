import simulatorService from './service/simulator.service';
import * as dotenv from 'dotenv';

// initialize configuration
const dotenvResult = dotenv.config();
// checking configuration error
if (dotenvResult.error) {
    throw dotenvResult.error;
}

// call main function base on 5 minutes interval
setInterval(simulatorService.start, 60000);

console.log('\nWorker started');