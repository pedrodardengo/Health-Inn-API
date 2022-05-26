import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module';
import { ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('Health-Inn')
      .setDescription('An API for employees to register for occupational exam')
      .setVersion('0.1')
      .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document, { useGlobalPrefix: true })

  app.setGlobalPrefix("api")
  await app.listen(3000)
}
bootstrap()
    .then(() => console.log('Nest application started.'))
    .catch(() => console.log('Gracefully shutting down application.'));