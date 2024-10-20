import * as cdk from 'aws-cdk-lib';

const supportedEnvironments = ['dev', 'prod', 'test'] as const;
type SupportedEnvironment = (typeof supportedEnvironments)[number];

export interface BuildConfig {
  readonly env: SupportedEnvironment;
  readonly region: string;
  readonly envPrefix: string;
  readonly appName: string;
  readonly awsAccountId: string;
  readonly pipelineMode: boolean;
}

export const getConfig = (app: cdk.App): BuildConfig => {
  const defaultEnv = app.node.tryGetContext('defaultEnv');
  const awsAccountId = app.node.tryGetContext('awsAccountId');
  let env = app.node.tryGetContext('env');
  let isPipelineMode = app.node.tryGetContext('pipeline');

  // input invalidations
  if (!defaultEnv) {
    console.log('No default environment [defaultEnv] in ckd.json, Aborting build process');
    throw new Error('No value found for defaultEnv in cdk config');
  }

  if (!env) {
    console.log(`No build environment passed, so using the defaultEnv [${defaultEnv}]`);
    env = defaultEnv;
  }

  if (!supportedEnvironments.includes(env)) {
    throw new Error(`${env} is not in supported environments: ${supportedEnvironments.join(', ')}`);
  }

  // setting the build config values
  console.log(`Loading the configs for build environment [${env}]`);
  const unparsedEnv = app.node.tryGetContext(env);
  return {
    env: env,
    region: ensureString(unparsedEnv, 'region'),
    envPrefix: ensureString(unparsedEnv, 'envPrefix'),
    appName: ensureString(unparsedEnv, 'appName'),
    awsAccountId: awsAccountId,
    pipelineMode: isPipelineMode,
  };
};

const ensureString = (object: { [name: string]: any }, propName: string): string => {
  if (!object[propName] || object[propName].trim().length === 0) throw new Error(propName + ' does not exist or is empty');

  return object[propName];
};

export const getConfigByEnv = (environment: SupportedEnvironment, app: cdk.App): BuildConfig => {
  if (!supportedEnvironments.includes(environment)) {
    throw new Error(`[${environment}] is not in supported environments: ${supportedEnvironments.join(', ')}`);
  }

  let isPipelineMode = app.node.tryGetContext('pipeline');
  const awsAccountId = app.node.tryGetContext('awsAccountId');
  const unparsedEnv = app.node.tryGetContext(environment);

  console.log(`Loading the configs for build environment using getConfigByEnv [${environment}]`);
  return {
    env: environment,
    region: ensureString(unparsedEnv, 'region'),
    envPrefix: ensureString(unparsedEnv, 'envPrefix'),
    appName: ensureString(unparsedEnv, 'appName'),
    awsAccountId: awsAccountId,
    pipelineMode: isPipelineMode,
  };
};
