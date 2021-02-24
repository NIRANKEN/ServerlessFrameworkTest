import schema from './schema';

export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'hello',
        request: {
          schema: {
            'application/json': schema
          }
        },
        documentation: {
          description: 'test function for aws lambda with nodejs & typescript & serverlessV2',
          requestHeaders: {

          },
          methodResponses: {
            statusCode: 200,
            responseModels: {
              'application/json': '【ResponseModelName】'
            }
          }
        }
      }
    }
  ]
}
