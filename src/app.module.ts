import {
  Module,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware';
import { HeroModule } from 'hero/hero.module';
@Module({
  imports: [
    HeroModule
  ],
  providers: [
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
