import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './lib/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
    }),
    TypeOrmModule.forRoot({
      url: process.env.DB_URL,
      type: 'postgres',
      synchronize: true,
      entities: entities,
    }),
    AuthModule,
    MovieModule,
    UserModule,
  ],
})
export class AppModule {}
