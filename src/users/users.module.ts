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
@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TimeoutMiddleware)
      .with(1)
      .forRoutes('/');
  }
}
