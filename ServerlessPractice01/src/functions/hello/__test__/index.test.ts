import type { ValidatedAPIGatewayProxyEvent } from '../../../libs/apiGateway';
import schema from '../schema';
import { main as hello, getHelloMessage } from '../handler';
import { Context } from 'aws-lambda';

let testEvent: ValidatedAPIGatewayProxyEvent<typeof schema>;
let context: Context;
process.on('unhandledRejection', console.dir);

describe('check handler results', () => {
    beforeEach(() => {
        testEvent = require('../mock.json');
        context = {} as Context;
    });

    // middy.jsで書かれたhandlerのテスト
    it('check 200 resoponse', async (done) => {
        await hello(testEvent, context, (error, response) => {
            expect(error).toBeNull();
            expect(response).not.toBeNull();
            expect(response).toMatchObject({statusCode: 200});
            done();
        });
    });
    
    // responseのjsonのテスト
    it('check message content', () => {
        expect(getHelloMessage(testEvent)).toBe('Hello Frederic, welcome to the exciting Serverless world!');
        testEvent.body.name = 'フレドリック';
        expect(getHelloMessage(testEvent)).toBe('Hello フレドリック, welcome to the exciting Serverless world!');
    });
});

export default {};