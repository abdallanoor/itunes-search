import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SearchModule } from "./search/search.module";
import { EpisodesModule } from "./episode/episodes.module";
import { AppController } from "./app.controller";

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SearchModule,
    EpisodesModule,
  ],
})
export class AppModule {}
