import { Injectable, NestMiddleware } from '@nestjs/common';
import { TypeormStore } from 'connect-typeorm/out';
import { NextFunction } from 'express';
import * as session from 'express-session';
import { DataSource } from 'typeorm';
import { SessionEntity } from '../typeorm/entities/SessionEntity';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(private readonly dataSource: DataSource) {}

  use(_req: Request, _res: any, next: NextFunction) {
    const { SESSION_SECRET } = process.env;
    const sessionRepository = this.dataSource.getRepository(SessionEntity);
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore().connect(sessionRepository),
    });
    console.log("middleware")
    next();
  }
}
