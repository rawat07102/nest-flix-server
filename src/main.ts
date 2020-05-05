import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ValidationPipe,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const formatedErrors = errors.map(({ property, constraints }) => ({
          property,
          constraints,
        }));
        return new BadRequestException({
          validationErrors: formatedErrors,
          message: 'Validation Failed',
        });
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
