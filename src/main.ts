import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Handler, Context, APIGatewayEvent } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';
import './cloudinary.config'; // Import the Cloudinary configuration

let cachedServer: Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  cachedServer = serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (event: APIGatewayEvent, context: Context) => {
  if (!cachedServer) {
    await bootstrap(); // Initialize the server if it hasn't been cached
  }
  return cachedServer(event, context, () => { });
};
