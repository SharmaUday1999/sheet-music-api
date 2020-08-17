import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(JSON.stringify(event.body));
  const params = {
    TableName: process.env.tableName,

    Item: {
      sheetId: uuid.v1(),
      title: data.title,
      composer: data.composer,
      publisher: data.publisher,
      copyrightType: data.copyrightType,
    }
  };

  await dynamoDb.put(params);

  return params.Item;
});
