import { Injectable, NestInterceptor, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: Observable<any>
  ): Observable<any> {
    console.log("[interceptor:logging] before");
    const now = Date.now();

    return call$.pipe(
      tap(() =>
        console.log(`[interceptor:logging] after... ${Date.now() - now} ms`)
      )
    );
  }
}
