import { testModel } from '../model/test.model';

class TestService {

    // save data mongo client
    async create(input) {
        try {
            return await testModel.create(input);
        } catch (error) {
            throw new Error(error);
        }
    }

    // find data mongo client
    async findOne(input) {
        try {
            return await testModel.findOne(input);
        } catch (error) {
            throw new Error(error);
        }
    }

    // remove data mongo client
    async delete() {
        try {
            return await testModel.deleteMany({});
        } catch (error) {
            throw new Error(error);
        }
    }

}

export default new TestService();