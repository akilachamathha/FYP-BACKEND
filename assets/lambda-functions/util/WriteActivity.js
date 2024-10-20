const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');
const ddbClient = new DynamoDBClient({});
const docClient = DynamoDBDocument.from(ddbClient);

async function WriteActivity(tenantName, type, activity) {
  let date = new Date();
  const dateTime = date.toISOString();

  try {
    await docClient.put({
      TableName: process.env.ACTIVITY_LOG_DATA_TABLE_NAME,
      Item: {
        tenantName: tenantName,
        date: dateTime,
        log: activity,
        type: type,
      },
    });
    return `Succefully Added..`;
  } catch (error) {
    console.error('Error:', error);
    return error;
  }
}

exports.WriteActivity = WriteActivity;
