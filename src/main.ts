require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT ?? 3000;

  await app.listen(PORT);
  console.log(`App is listening on port ${PORT}`);
}
bootstrap();
