const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');
const { handleSuccess, handleError } = require('./util/ResponseUtil');
const ddbClient = new DynamoDBClient({});
const docClient = DynamoDBDocument.from(ddbClient);

exports.handler = async function (event) {
  console.log(`event: ${JSON.stringify(event)}`);
  try {
    let sensorData = validateInputs(event);
    const response = await storeSensorData(sensorData);
    console.log(`response: ${JSON.stringify(response)}`);
    return handleSuccess(response);
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};

async function storeSensorData(sensorData) {
  const rawDateTime = new Date();
  try {
    const param = {
      buoyId: sensorData.buoyId,
      espDateTime: sensorData.dateTime,
      accData: sensorData.accData,
      rtcData: sensorData.rtcData,
      current_mA: sensorData?.current,
      voltage_V: sensorData?.voltage,
      location: {
        latitude: sensorData.latitude,
        longitude: sensorData.longitude,
        satellites: sensorData.satellites,
      },
      storedTime: rawDateTime.toISOString(),
    };
    await PutSensorData(param);
    const msg = `Sensors Data successfully stored`;
    return msg;
  } catch (error) {
    console.error('Data storing Error:', error);
    return error;
  }
}

async function PutSensorData(params) {
  params.writeTime = Date;
  try {
    await docClient.put({
      TableName: process.env.SENSOR_DATA_TABLE_NAME,
      Item: params,
    });
    const msg = `Data Successfully put in to DB`;
    return msg;
  } catch (error) {
    console.error('DB Error:', error);
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

  if (!input.dateTime) throwExposableError('Input parameter dateTime is empty');

  if (!input.accData) throwExposableError('Input parameter accData is empty');

  return input;
};
