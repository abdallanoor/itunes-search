import { Module } from "@nestjs/common";
import { SearchService } from "./search.service";
import { SearchController } from "./search.controller";
import { DynamodbService } from "./dynamodb.service";

@Module({
  controllers: [SearchController],
  providers: [SearchService, DynamodbService],
})
export class SearchModule { }
