import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CuitValidatorPipe } from './api/company/cuit-validator.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(new CuitValidatorPipe());

  const config = new DocumentBuilder()
  .setTitle('It Patagonia')
  .setDescription('An It Patagonia API challenge description')
  .setVersion('1.0')
  .addTag('It Patagonia collection')
  .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
