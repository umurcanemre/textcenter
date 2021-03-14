import AWS from 'aws-sdk';

// Set the region 
AWS.config.update({
  region: "localhost",
  endpoint: 'http://localhost:9800',
  // accessKeyId default can be used while using the downloadable version of DynamoDB. 
  // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
  accessKeyId: "hijwso",
  // secretAccessKey default can be used while using the downloadable version of DynamoDB. 
  // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
  secretAccessKey: "tmz2w"
});
// Create the DynamoDB service object
var ddbClient = new AWS.DynamoDB.DocumentClient();
var ddb = new AWS.DynamoDB

export function readDDB(param, callback) {
  ddbClient.get(param, function (err, data) {
    if (err) {
      throw new Error(err + "\nWith parameters " + JSON.stringify(param))
    } else {
      callback(data.Item)
    }
  })
}

export function writeDDB(param, callback) {
  ddbClient.put(param, function (err, data) {
    if (err) {
      throw new Error(err + "\nWith parameters " + JSON.stringify(param))
    } else {
      callback()
    }
  });
}

export function dropTables() {
  ddb.deleteTable({ "TableName": "Text" }, function (err, data) {
    if (err) {
      throw new Error(err + "\nWith parameters " + JSON.stringify(param))
    }
  });
}
