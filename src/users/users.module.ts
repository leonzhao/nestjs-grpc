import {
  Module,
  NestModule,
  MiddlewareConsumer
} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TimeoutMiddleware } from '../common/middleware';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers'
import { SharedModule } from 'shared/shared.module';
@Module({
  imports: [
    // MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    DatabaseModule,
    SharedModule
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
