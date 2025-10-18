/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AllExceptionsFilter } from './common/guards/filter/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import  cookieParser from 'cookie-parser';
import  csurf from 'csurf';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  // Cookie parser for CSRF
  app.use(cookieParser());

  app.use(
    csurf({
      cookie: true,
    }),
  );
  app.enableCors({
    origin: true,
    methods: 'GET,POST,PATCH,PUT,DELETE',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  const config = new DocumentBuilder()
    .setTitle('Job Portal API')
    .setDescription('API documentation for the Job Portal application')
    .setVersion('1.0')
    .addBearerAuth() // JWT authentication
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
