import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

// initialize configuration
dotenv.config();

class MongooseService {
    private count: number = 0;
    // mongoose db connect options
    private mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        useFindAndModify: false,
    };

    constructor() {
        this.connectDb();
    }

    // return mongoose object, so import required on new page
    getMongoose() {
        return mongoose;
    }

    // create connection with mongodb
    connectDb = () => {
        mongoose
            .connect(process.env.MONGO_URI, this.mongooseOptions)
            .then(() => {
                console.log('MongoDB is connected');
            })
            .catch(err => {
                const retrySeconds: number = 5;
                console.log(`MongoDB connection unsuccessful (will retry #${++this
                    .count} after ${retrySeconds} seconds):`, err.message
                );
                // after attempt count 5 it will exit from process
                if (this.count >= 5) {
                    process.exit(1);
                }
                setTimeout(this.connectDb, retrySeconds * 1000);
            });
    }

}

export default new MongooseService();