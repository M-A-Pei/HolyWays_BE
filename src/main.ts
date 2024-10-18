import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverlessExpress from '@vendia/serverless-express';
import { Handler, Context, APIGatewayEvent } from 'aws-lambda';
import './cloudinary.config'; // Assuming you need Cloudinary config

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS for cross-origin requests
  await app.init(); // Initialize the NestJS app

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (event: APIGatewayEvent, context: Context) => {
  if (!server) {
    server = await bootstrap(); // Cache the server for re-use
  }
  return server(event, context, () => { }); // Invoke the cached server
};
