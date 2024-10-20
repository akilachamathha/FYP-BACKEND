const { docClient } = require('../shareConsumptionData');
const { docClient } = require('../storeConsumptionData');
const { docClient } = require('../storeExpectedPPASupply');
const { docClient } = require('../storeGenerationData');
const { throwExposableError } = require('./ResponseUtil');

async function readConsDataFromDB(siteId, startDate, endDate) {
  try {
    const queryResults = await docClient.query({
      TableName: process.env.SITES_CONSUMPTION_DATA_TABLE_NAME,
      KeyConditionExpression: '#siteId = :siteId AND #date BETWEEN :start_date AND :end_date',
      ExpressionAttributeNames: {
        '#siteId': 'siteId',
        '#date': 'date',
      },
      ExpressionAttributeValues: {
        ':siteId': siteId,
        ':start_date': startDate,
        ':end_date': endDate,
      },
    });
    return queryResults.Items;
  } catch (error) {
    console.error('Generation DB Error:', error);
  }
}

async function PutConsDataInToDB(tableName, params) {
  try {
    await docClient.put({
      TableName: tableName,
      Item: params,
    });
    return `Succefully Added..`;
  } catch (error) {
    console.error(`${tableName} Error:`, error);
    throwExposableError(`${tableName} Error: ${error}`);
    return error;
  }
}

async function GetSitesDetails(tenantId, tenantCode) {
  try {
    const readData = await docClient.get({
      TableName: process.env.SITES_DETAILS_TABLE_NAME,
      Key: {
        tenantId: tenantId,
        tenantCode: tenantCode,
      },
    });
    return readData.Item;
  } catch (error) {
    console.error('Sites Details DB Error:', error);
    throwExposableError(`Sites Details DB Error: ${error}`);
  }
}

exports.readConsDataFromDB = readConsDataFromDB; // Put data in to Plant Table_________________________________________________
exports.PutConsDataInToDB = PutConsDataInToDB;
exports.GetSitesDetails = GetSitesDetails; //  Put data in to Plant Table_________________________________________________

async function PutExpPPAToDB(params) {
  try {
    await docClient.put({
      TableName: process.env.EXPECTED_PPA_TABLE_NAME,
      Item: params,
    });
    return `Succefully Added..`;
  } catch (error) {
    console.error('Error:', error);
    return error;
  }
}
exports.PutExpPPAToDB = PutExpPPAToDB; //  Put data in to Plant Table_________________________________________________

async function PutPlantInToDB(params) {
  try {
    await docClient.put({
      TableName: process.env.DAILY_GEN_TABLE_NAME,
      Item: params,
    });
    return `Succefully Added..`;
  } catch (error) {
    console.error('Error:', error);
    return error;
  }
}
exports.PutPlantInToDB = PutPlantInToDB;
