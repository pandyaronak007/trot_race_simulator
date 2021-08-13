import mongooseService from '../db/mongoose';

const Schema = mongooseService.getMongoose().Schema;

// test collection structure defined
interface Test {
    name: string;
}

// test collection schema defined
const testSchema: any = new Schema<Test>({
    name: String
});

export const testModel = mongooseService.getMongoose().model('test', testSchema);
