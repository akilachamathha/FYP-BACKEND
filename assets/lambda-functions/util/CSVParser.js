function CSVParser(fileContent, changeDDMMYYtoMMDD = false) {
  let rowList = [];
  if (fileContent.includes('\r\n')) {
    rowList = fileContent.split('\r\n');
  } else if (fileContent.includes('\n')) {
    rowList = fileContent.split('\n');
  }
  const headers = rowList[0].split(',');

  const csvData = [];
  for (let i = 1; i < rowList.length; i++) {
    const rowValues = rowList[i].split(',');
    if (rowValues.every((element) => element != '')) {
      csvData.push(rowValues);
    }
  }

  function dateFormat(date) {
    const dateComponent = date.split('/');
    const day = dateComponent[0];
    const month = dateComponent[1];
    const year = dateComponent[2];
    return changeDDMMYYtoMMDD ? `${month}-${day}` : `${year}-${month}-${day}`;
  }

  function setDataArray(dataRow) {
    const dataList = [];
    for (let i = 1; i < dataRow.length; i++) {
      dataList.push({
        time: headers[i],
        unit: Number(dataRow[i]),
      });
    }
    return dataList;
  }

  const proceededDataList = [];
  for (const dataRow of csvData) {
    if (dataRow != '') {
      proceededDataList.push({
        date: dateFormat(dataRow[0]),
        data: setDataArray(dataRow),
      });
    } else {
      continue;
    }
  }
  return proceededDataList;
}
exports.CSVParser = CSVParser;
