import * as session from 'express-session';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { TypeormStore } from 'connect-typeorm/out';
import { DataSource } from 'typeorm';
import { SessionEntity } from './lib/typeorm/entities/SessionEntity';

async function bootstrap() {
  const { PORT, ORIGIN, SESSION_SECRET } = process.env;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({ credentials: true, origin: ORIGIN });
  const sessionRepository = app.get(DataSource).getRepository(SessionEntity);
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore().connect(sessionRepository),
    }),
  );
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
  await app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
}
bootstrap();
