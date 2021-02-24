import type { ValidatedAPIGatewayProxyEvent } from '../../../libs/apiGateway';
import schema from '../schema';
import { main as hello, getHelloMessage } from '../handler';
// import { getHelloMessage } from '../handler';

let testEvent;
const context = require('aws-lambda-mock-context');

describe('check handler results', () => {
    beforeEach(() => {
        testEvent = {
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                name: 'Fredric'
            }
        };
    });

    it('check resoponse', async (done) => {
        const event : ValidatedAPIGatewayProxyEvent<typeof schema> = require('../mock.json');
        return await hello(event, context(), (err, response) => {
            try {
                expect(err).toBeNull();
                expect(response).not.toBeNull();
                // このへんはmiddy.js噛ませたときのテスト
                expect(response).toMatchObject({statusCode: 200});
                done();
            } catch (err) {
                done(err);
            }
        });
    });
    
    it('check message content', () => {
        // アプリケーションの方のテスト
        expect(getHelloMessage(testEvent)).toBe('Hello Fredric, welcome to the exciting Serverless world!');
        testEvent.body.name = 'フレドリック';
        expect(getHelloMessage(testEvent)).toBe('Hello フレドリック, welcome to the exciting Serverless world!');
    });
});

export default {};