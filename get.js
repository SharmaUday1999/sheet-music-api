import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
const AWS = require('aws-sdk');


export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,

    Key: {
      sheetId: event.pathParameters.id
    }
  };
  const s3 = new AWS.S3({
    signatureVersion: 'v4',
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    Bucket: process.env.BUCKET,
});
  const result = await dynamoDb.get(params);
  if ( !result.Item) {
    throw new Error("Item not found.");
  }


  const signedURL = s3.getSignedUrl('getObject' ,{
    Bucket: 'sheet-music-uploads',
    Key: `${result.Item.title}.pdf`,
    Expires: 1000
   });

  const returnObject = {
    title: result.Item.title,
    composer: result.Item.composer,
    publisher: result.Item.publisher,
    copyrightType: result.Item.copyrightType,
    url: signedURL

  };
  // Return the retrieved item
  console.log(returnObject.title);
  return returnObject;
});
