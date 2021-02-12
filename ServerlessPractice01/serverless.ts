import type { AWS } from '@serverless/typescript';

import { hello } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'sample-serverless-offline',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
    dynamodb: {
      stages: ['dev'],
      start: {
        port: 8000,
        inMemory: true,
        migrate: true,
        seed: true
      },
      seed: {
        development: {
          sources: [
            {
              table: 'jankens',
              sources: ['./migrations/jankens.json']
            }
          ]        
        }
      },
    }
  },
  plugins: ['serverless-webpack', 'serverless-offline', 'serverless-dynamodb-local'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  functions: { hello },
  resources: {
    Resources: {
      JankensTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'jankens',
          AttributeDefinitions: [
            {
              AttributeName: 'player',
              AttributeType: 'S'
            },
            {
              AttributeName: 'unixtime',
              AttributeType: 'N'
            }
          ],
          KeySchema: [
            {
              AttributeName: 'player',
              KeyType: 'HASH'
            },
            {
              AttributeName: 'unixtime',
              KeyType: 'RANGE'
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        }
      }

    }
  }
}

module.exports = serverlessConfiguration;
