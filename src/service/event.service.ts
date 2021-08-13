import { eventModel } from '../model/event.model';

class EventService {

    // save data mongo client
    async create(input) {
        try {
            return await eventModel.create(input);
        } catch (error) {
            throw new Error(error);
        }
    }

}

export default new EventService();