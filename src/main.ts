import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import 'cloudinary.config';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors();
  await app.init();  // Initializes the NestJS app but doesn't start listening

  return server;  // Return the Express server instance
}

export const handler = bootstrap();
