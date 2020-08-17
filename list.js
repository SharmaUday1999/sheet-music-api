import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.tableName,
        Select: "ALL_ATTRIBUTES"
    };

    const result = await dynamoDb.scan(params, function(err, data) {
        if (err) {
           console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
           return data;
        }
      });

  // Return the matching list of items in response body
  return result.Items;
});