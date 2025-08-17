import { Injectable } from "@nestjs/common";
import * as AWS from "aws-sdk";
import { Podcast } from "./podcast.entity";

@Injectable()
export class DynamodbService {
  private dynamoDB: AWS.DynamoDB.DocumentClient;
  private readonly tableName = "PodcastSearchCache";

  constructor() {
    AWS.config.update({
      region: process.env.AWS_REGION || "us-east-1",
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    this.dynamoDB = new AWS.DynamoDB.DocumentClient();

    this.initializeTable();
  }

  private async initializeTable() {
    try {
      const dynamoDBClient = new AWS.DynamoDB();

      const tables = await dynamoDBClient.listTables().promise();
      if (!tables.TableNames?.includes(this.tableName)) {
        console.log("Creating DynamoDB table...");

        await dynamoDBClient
          .createTable({
            TableName: this.tableName,
            KeySchema: [
              {
                AttributeName: "searchTerm",
                KeyType: "HASH",
              },
            ],
            AttributeDefinitions: [
              {
                AttributeName: "searchTerm",
                AttributeType: "S",
              },
            ],
            BillingMode: "PAY_PER_REQUEST",
          })
          .promise();

        console.log("DynamoDB table created successfully");
      }
    } catch (error) {
      console.error("DynamoDB initialization error:", error);
    }
  }

  async getCachedSearch(searchTerm: string): Promise<Podcast[] | null> {
    try {
      const params = {
        TableName: this.tableName,
        Key: {
          searchTerm: searchTerm.toLowerCase(),
        },
      };

      const result = await this.dynamoDB.get(params).promise();

      if (result.Item) {
        const cacheAge = Date.now() - result.Item.timestamp;
        const cacheMaxAge = 24 * 60 * 60 * 1000;

        if (cacheAge < cacheMaxAge) {
          return result.Item.results;
        } else {
          await this.deleteCachedSearch(searchTerm);
          return null;
        }
      }

      return null;
    } catch (error) {
      console.error("Cache retrieval error:", error);
      return null;
    }
  }

  async cacheSearch(searchTerm: string, results: Podcast[]): Promise<void> {
    try {
      const params = {
        TableName: this.tableName,
        Item: {
          searchTerm: searchTerm.toLowerCase(),
          results,
          timestamp: Date.now(),
          ttl: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        },
      };

      await this.dynamoDB.put(params).promise();
      console.log(`Cached search results for: ${searchTerm}`);
    } catch (error) {
      console.error("Cache storage error:", error);
    }
  }

  private async deleteCachedSearch(searchTerm: string): Promise<void> {
    try {
      const params = {
        TableName: this.tableName,
        Key: {
          searchTerm: searchTerm.toLowerCase(),
        },
      };

      await this.dynamoDB.delete(params).promise();
      console.log(`Deleted expired cache for: ${searchTerm}`);
    } catch (error) {
      console.error("Cache deletion error:", error);
    }
  }
}
