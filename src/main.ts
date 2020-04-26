import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const formatedErrors = errors.map(({ property, constraints }) => ({
          property,
          message: constraints,
        }));
        return {
          status: HttpStatus.BAD_REQUEST,
          validationErrors: formatedErrors,
        };
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
