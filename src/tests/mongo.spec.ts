import testService from '../service/test.service';

describe('Creating test documents', () => {
    const mockObject: any = { name: 'test' };

    it('creating test data', done => {
        testService.create(mockObject)
            .then((res: any) => {
                if (res && res.name) {
                    expect(mockObject.name).toEqual(res.name);
                }
                done();
            });
    });

    it('finds test with the name of test', done => {
        testService.create(mockObject).then(() => done());
        testService.findOne(mockObject)
            .then((res: any) => {
                if (res && res.name) {
                    expect(mockObject.name).toEqual(res.name);
                }
                done();
            });
    });

    afterAll(done => {
        testService.delete();
        done();
    });

});