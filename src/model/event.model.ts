import mongooseService from '../db/mongoose';

const Schema = mongooseService.getMongoose().Schema;

// event collection structure defined
interface Event {
    event: string;
    horse: {
        id: number,
        namer: string,
    };
    time: number;
}

// event collection schema defined
const eventSchema = new Schema<Event>({
    event: String,
    horse: {
        id: Number,
        name: String
    },
    time: Number
});

export const eventModel = mongooseService.getMongoose().model('event', eventSchema);
