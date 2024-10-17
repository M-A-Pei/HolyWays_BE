import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Handler } from 'aws-lambda'; // For Vercel's Serverless Functions
import serverlessExpress from '@vendia/serverless-express'; // To wrap Express in Lambda format
import "./cloudinary.config"

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Enable CORS for cross-origin requests

  await app.init(); // Initialize the NestJS app without listening

  const expressApp = app.getHttpAdapter().getInstance(); // Get the underlying Express app

  return serverlessExpress({ app: expressApp }); // Return the serverless handler
}

let cachedServer: Handler;

export const handler: Handler = async (event, context, callback) => {
  if (!cachedServer) {
    cachedServer = await bootstrap(); // Cache the server handler for future invocations
  }
  return cachedServer(event, context, callback);
};
