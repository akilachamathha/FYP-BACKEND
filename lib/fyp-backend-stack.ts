import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BuildConfig } from './build-config';
import { LambdaApi } from './construct-lambda-api';
import { CognitoUserPool } from './construct-cognito-pool';
import { DynamoDBTable } from './construct-dynamodb-table';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class FypBackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, buildConfig: BuildConfig, props?: cdk.StackProps) {
    super(scope, id, props);

    // create the cognito user pool
    const coginitoUserPool = new CognitoUserPool(this, buildConfig);

    // create database schema
    const dynamoLDRdataTable = new DynamoDBTable(this, 'LDRdataTable', buildConfig, {
      partitionKey: 'date',
      sortKey: 'time',
    });

    // create the api end point
    const lambdaApi = new LambdaApi(this, buildConfig, {
      userPool: coginitoUserPool,
      dynamoLDRdataTable,
    });
  }
}
