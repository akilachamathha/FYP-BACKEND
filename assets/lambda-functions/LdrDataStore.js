const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');
const { handleSuccess, handleError } = require('./util/ResponseUtil');
const ddbClient = new DynamoDBClient({});
const docClient = DynamoDBDocument.from(ddbClient);

exports.handler = async function (event) {
  console.log(`event: ${JSON.stringify(event)}`);
  try {
    let params = validateInputs(event);
    const response = await StoreLDRData(params);
    console.log(`response: ${JSON.stringify(response)}`);
    return handleSuccess(response);
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};

async function StoreLDRData(params) {
  params.writeTime = Date;
  try {
    await docClient.put({
      TableName: process.env.LDR_DATA_TABLE_NAME,
      Item: params,
    });
    const msg = `LDR Data succefuly updated`;
    return msg;
  } catch (error) {
    console.error('Error:', error);
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

  if (!input.location) throwExposableError('Input parameter location is empty');

  if (!input.dateTime) throwExposableError('Input parameter dateTime is empty');

  if (!input.data) throwExposableError('Input parameter data is empty');

  return input;
};
