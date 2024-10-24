import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './cloudinary.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log("database url: ", process.env.DATABASE_URL)
  console.log("direct url: ", process.env.DIRECT_URL)
  console.log("cloudinary name: ", process.env.CLOUDINARY_CLOUD_NAME)
  console.log("node env: ", process.env.NODE_ENV)
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
