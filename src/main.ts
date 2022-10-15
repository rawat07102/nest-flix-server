import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const { PORT, ORIGIN } = process.env
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api")
  app.enableCors({ credentials: true, origin: ORIGIN });
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
  await app.listen(PORT, () => console.log(`listening on port ${PORT}...`))
}
bootstrap();
