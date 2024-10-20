import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BuildConfig } from './build-config';
import { FypBackendStack } from './fyp-backend-stack';

export class FypBackendStage extends cdk.Stage {
  constructor(scope: Construct, id: string, buildConfig: BuildConfig, props?: cdk.StageProps) {
    super(scope, id, props);
    const stackId = `${buildConfig.envPrefix}Stack`;
    new FypBackendStack(this, stackId, buildConfig, {
      stackName: stackId,
      env: {
        account: buildConfig.awsAccountId,
        region: buildConfig.region,
      },
    });
  }
}
