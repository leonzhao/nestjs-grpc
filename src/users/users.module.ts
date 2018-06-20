import {
  Module,
  NestMiddleware,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TimeoutMiddleware } from '../common/middleware';
import { UserSchema } from './schemas/user.schema';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers'
@Module({
  imports: [
    // MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    DatabaseModule
  ],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TimeoutMiddleware)
      .with(1)
      .forRoutes('/');
  }
}
