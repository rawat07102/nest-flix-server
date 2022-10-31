import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './movie/movie.module';
import { MyHttpModule } from './http/http.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './env.development',
    }),
    TypeOrmModule.forRoot({
      url: process.env.DB_URL,
      type: 'postgres',
    }),
    MyHttpModule,
    AuthModule,
    MovieModule,
    UserModule,
  ],
})
export class AppModule {}
