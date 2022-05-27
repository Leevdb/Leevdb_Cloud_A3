// functions to get and set DynamoDB data
import * as AWS from 'aws-sdk';
import { ConfigurationOptions } from 'aws-sdk';
import { Key } from 'aws-sdk/clients/dynamodb';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
require('dotenv').config();

const configuration: ConfigurationOptions = {
  region: process.env.REGION,

  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
};

AWS.config.update(configuration);
const docClient = new AWS.DynamoDB.DocumentClient(); // queries db
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' }); //gets stuff with filter expressions

export const getData = async (tableName: string, key: {}) => {
  const params: DocumentClient.GetItemInput = {
    TableName: tableName,
    Key: key,
  };

  try {
    const result = await docClient.get(params).promise();
    // if result has the Item property, it means the item was found
    if (result.Item) {
      return result.Item;
    }
  } catch (error) {
    console.log('getData: error: ', error);
  }
};

// query table for all items
export const getAllData = async (tableName: string) => {
  const params = {
    TableName: tableName,
  };
  try {
    const result = await docClient.scan(params).promise();
    if (result.$response.httpResponse.statusCode === 200) {
      return result.Items;
    }
  } catch (error) {
    console.log('getAllData: error: ', error);
  }
};

export const putData = async (tableName: string, item: {}) => {
  const params = {
    TableName: tableName,
    Item: item,
  };
  const data = await docClient.put(params).promise();
  return data;
};

// delete and item from a table
export const deleteData = async (tableName: string, key: Key) => {
  const params = {
    TableName: tableName,
    Key: key,
  };
  const data = await docClient.delete(params).promise();
  return data;
};


export const queryTableIndexed = async (tableName: string, indexName: string, key: string) => {

  const params = {
    TableName: tableName,
    IndexName: indexName,
    KeyConditionExpression: 'username = :username',  //where part of the query
    ExpressionAttributeValues: {  //the value of the where part
      ':username': key,
    },

  };

  try {

    const data = await docClient.query(params).promise();
    return data;
  } catch (error) {
    console.log('queryTableIndexed: error: ', error);
  }
};

