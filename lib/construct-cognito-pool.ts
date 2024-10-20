import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { BuildConfig } from './build-config';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class CognitoUserPool extends Construct {
  public readonly userPool: cognito.UserPool;
  public readonly appClient: cognito.UserPoolClient;

  constructor(scope: Construct, buildConfig: BuildConfig) {
    super(scope, `${buildConfig.envPrefix}UserPool`);
    let poolName = `${buildConfig.envPrefix}UserPool`;

    const cognitoEmailBody = new lambda.Function(this, 'cognitoEmailBody', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'cognitoEmailBody.handler',
      code: lambda.Code.fromAsset('assets/lambda-functions', {
        exclude: ['**', `!cognitoEmailBody.js`, `!util`, `!util/*`],
      }),
    });

    const pool = new cognito.UserPool(this, poolName, {
      userPoolName: poolName,
      signInAliases: {
        email: true,
      },
      selfSignUpEnabled: false,
      autoVerify: {
        email: true,
      },
      standardAttributes: {
        email: {
          mutable: false,
          required: true,
        },
      },
      keepOriginal: {
        email: true,
      },
      lambdaTriggers: {
        customMessage: cognitoEmailBody,
      },
      deviceTracking: {
        challengeRequiredOnNewDevice: true,
        deviceOnlyRememberedOnUserPrompt: false,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    let clientName = `${buildConfig.envPrefix}UserClient`;
    const client = pool.addClient(clientName, {
      userPoolClientName: clientName,
      authFlows: {
        userSrp: true,
      },
    });

    this.userPool = pool;
    this.appClient = client;
  }
}
