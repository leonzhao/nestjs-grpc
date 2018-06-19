import { Injectable, NestMiddleware, MiddlewareFunction } from "@nestjs/common";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  resolve(name: string): MiddlewareFunction {
    return (req, res, next) => {
      console.log(`[middleware:logger] ${name}: ${req.method} ${req.url}`);
      next();
    };
  }
}
