import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder() // for swagger
    .setTitle('Documentation for project')
    .setDescription('REST API documentation')
    .setVersion('1.0.0')
    .addTag('Darius')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document); // for swagger
  await app.listen(PORT, () => console.log(`Server started on ${PORT} PORT`));
}

start();
