import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import * as express from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json({ limit: "2mb" }));
  app.enableCors();

  app.setGlobalPrefix("api");

  const config = app.get(ConfigService);
  const port = config.get("PORT") || 3001;
  await app.listen(port);

  console.log(`Nest backend listening on http://localhost:${port}`);
}
bootstrap();
