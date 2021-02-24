import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent, ValidatedAPIGatewayProxyEvent } from '../../libs/apiGateway';
import { formatJSONResponse } from '../../libs/apiGateway';
import { middyfy } from '../../libs/lambda';

import schema from './schema';

export const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log('You called hello.')
  console.log(event)
  return formatJSONResponse({
    message: getHelloMessage(event),
    // message: `Hello Hoge, welcome to the exciting Serverless world!`,
    event,
  });
}

export const getHelloMessage = (event: ValidatedAPIGatewayProxyEvent<typeof schema>) => {
  return `Hello ${event.body.name}, welcome to the exciting Serverless world!`;
}

export const main = middyfy(hello);
