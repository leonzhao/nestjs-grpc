import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('[guard:roles] can activate ? true');
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log('[guard:roles] reflect:', roles);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // const hasRole = () => user.roles.some(role => roles.includes(role));
    console.log('[guard:roles] user:', user);
    // return user && user.roles && hasRole()
    return true;
  }
}
