const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');
const { handleSuccess, handleError } = require('./util/ResponseUtil');
const { throwExposableError } = require('./util/ResponseUtil');
const { KeyCondition } = require('aws-cdk-lib/aws-appsync');
const ddbClient = new DynamoDBClient({});
const docClient = DynamoDBDocument.from(ddbClient);

exports.handler = async function (event) {
  console.log(`event: ${JSON.stringify(event)}`);
  try {
    let inputs = validateInputs(event);

    const response = await getSensorData(inputs);
    if (response.length === 0) {
      throwExposableError('No data found for the given parameters');
    } else {
    }

    console.log(`response: ${JSON.stringify(response)}`);
    return handleSuccess(response);
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};

async function getSensorData(inputs) {
  try {
    const queryResults = await docClient.query({
      TableName: process.env.SENSOR_DATA_TABLE_NAME,
      KeyConditionExpression: '#buoyId = :buoyId AND #espDateTime BETWEEN :startDateTime AND :endDateTime',
      ExpressionAttributeNames: {
        '#buoyId': 'buoyId',
        '#espDateTime': 'espDateTime',
      },
      ExpressionAttributeValues: {
        ':buoyId': inputs.buoyId,
        ':startDateTime': inputs.startDateTime,
        ':endDateTime': inputs.endDateTime,
      },
    });
    return queryResults.Items;
  } catch (error) {
    console.error('Sensor Data fetching Error:', error);
    return error;
  }
}

const validateInputs = (event) => {
  let input = {};
  if (event.body !== null && event.body !== undefined) {
    input = JSON.parse(event.body);
  } else {
    throwExposableError('Input parameters are empty');
  }

  if (!input.buoyId) throwExposableError('Input parameter buoyId is empty');

  if (!input.startDateTime) throwExposableError('Input parameter startDateTime is empty');

  if (!input.endDateTime) throwExposableError('Input parameter endDateTime is empty');

  return input;
};
