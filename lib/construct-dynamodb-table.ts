import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { BuildConfig } from './build-config';
import { RemovalPolicy } from 'aws-cdk-lib';

export interface DynamoDBTableProps {
  readonly partitionKey: string;
  readonly sortKey: string;
  readonly indexName?: string;
  readonly gsiPartitionKey?: string;
  readonly gsiSortKey?: string;
}

export class DynamoDBTable extends Construct {
  public readonly table: dynamodb.Table;
  public readonly tableName: string;

  constructor(scope: Construct, id: string, buildConfig: BuildConfig, props: DynamoDBTableProps) {
    super(scope, `${buildConfig.envPrefix}${id}`);

    const tableName = `${buildConfig.envPrefix}${id}`;

    const dynamoTable = new dynamodb.Table(this, tableName, {
      partitionKey: {
        name: props.partitionKey,
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: { name: props.sortKey, type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      tableName: tableName,
      removalPolicy: RemovalPolicy.RETAIN,
    });

    if (props.indexName && props.gsiPartitionKey && props.gsiSortKey) {
      dynamoTable.addGlobalSecondaryIndex({
        indexName: props?.indexName,
        partitionKey: {
          name: props?.gsiPartitionKey,
          type: dynamodb.AttributeType.STRING,
        },
        sortKey: {
          name: props.gsiSortKey,
          type: dynamodb.AttributeType.STRING,
        },
        projectionType: dynamodb.ProjectionType.ALL,
      });
    }

    this.table = dynamoTable;
    this.tableName = tableName;
  }
}
