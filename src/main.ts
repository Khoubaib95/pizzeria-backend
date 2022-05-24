import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as helmet from 'helmet';
import { appGlobalPrefix, apiVersion } from './app_constant/const';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(helmet);
  app.enableCors();
  app.setGlobalPrefix(`${appGlobalPrefix}/${apiVersion}`);
  await app.listen(process.env.PORT);
}
bootstrap();
