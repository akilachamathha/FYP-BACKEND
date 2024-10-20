#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { getConfig } from '../lib/build-config';
import { FypBackendStack } from '../lib/fyp-backend-stack';
import { FypBackendPipeline } from '../lib/fyp-backend-pipeline';

const app = new cdk.App();
const buildConfig = getConfig(app);

if (buildConfig.pipelineMode) {
  // production and test environments getting created thought the pipeline
  // So, prifixing the pipeline as 'Prod'
  // run the pieline mode via [cdk deploy/destroy -c pipeline=true]
  const pipelineName = 'ProdFypBackendPipeline';
  new FypBackendPipeline(app, pipelineName, {
    env: {
      account: buildConfig.awsAccountId,
      region: buildConfig.region,
    },
  });

  app.synth();
} else {
  const stackId = `${buildConfig.envPrefix}Stack`;
  new FypBackendStack(app, stackId, buildConfig, {
    stackName: stackId,
    env: {
      account: buildConfig.awsAccountId,
      region: buildConfig.region,
    },
  });
}
