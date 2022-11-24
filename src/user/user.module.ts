import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@src/lib/typeorm';
import { Services } from '@src/lib/constants';
import { MovieModule } from '@src/movie/movie.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), MovieModule],
  controllers: [UserController],
  providers: [
    {
      provide: Services.USER_SERVICE,
      useClass: UserService,
    },
  ],
  exports: [
    {
      provide: Services.USER_SERVICE,
      useClass: UserService,
    },
  ],
})
export class UserModule {}
