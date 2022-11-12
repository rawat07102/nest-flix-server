import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest()
    return req.isAuthenticated();
  }
}