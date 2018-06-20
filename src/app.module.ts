import {
  Module,
  ForbiddenException,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { UserModule } from './users/users.module';
import { LoggerMiddleware } from './common/middleware';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RolesGuard } from './common/guards';
import { LoggingInterceptor, TransformInterceptor } from './common/interceptor';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    UserModule,
    // MongooseModule.forRoot('mongodb://localhost:27017/nest'),
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard
    // }
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggingInterceptor
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TransformInterceptor
    // }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .with('AppModule')
      .forRoutes('/');
  }
}
