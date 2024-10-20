import { Construct } from 'constructs';
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';
import { BuildConfig } from './build-config';
import { LambdaFunction } from './construct-lambda-function';
import { CognitoUserPool } from './construct-cognito-pool';
import { DynamoDBTable } from './construct-dynamodb-table';

export interface LambdaApiProps {
  readonly userPool: CognitoUserPool;
  readonly dynamoLDRdataTable: DynamoDBTable;
}

export class LambdaApi extends Construct {
  public readonly apiEndpoint: apiGateway.RestApi;

  constructor(scope: Construct, buildConfig: BuildConfig, props: LambdaApiProps) {
    super(scope, '_');

    const apiEndpoint = new apiGateway.RestApi(this, `${buildConfig.envPrefix}Api`, {
      deployOptions: {
        stageName: buildConfig.env,
      },
      defaultCorsPreflightOptions: {
        allowOrigins: apiGateway.Cors.ALL_ORIGINS,
        allowMethods: apiGateway.Cors.ALL_METHODS,
      },
    });

    const echoGetGreeting = new LambdaFunction(this, 'echoGetGreeting', {
      httpMethod: 'GET',
      apiEndpoint: apiEndpoint,
    });

    this.apiEndpoint = apiEndpoint;
  }
}
