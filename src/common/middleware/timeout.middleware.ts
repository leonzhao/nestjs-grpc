import { Injectable, NestMiddleware, MiddlewareFunction } from "@nestjs/common";

let timeoutJob = (t: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, t * 1000);
  });
};

@Injectable()
export class TimeoutMiddleware implements NestMiddleware {
  async resolve(t: number): MiddlewareFunction {
    console.log(`[middleware:timeout] waiting ${t}s`);
    await timeoutJob(t);
    console.log("[middleware:timeout] prestart ...");
    return async (req, res, next) => {
      await timeoutJob(t / 4);
      console.log("[middleware:timeout] end ...");
      next();
    };
  }
}
