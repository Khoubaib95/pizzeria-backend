import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const requiredRoles: string[] = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    const userRoles = await this.usersService.getUserRole(request.user.id);
    console.log('userRoles : ', userRoles.roles);
    console.log('requiredRoles : ', requiredRoles);
    return this.validateUserRole(requiredRoles, userRoles.roles);
  }

  validateUserRole(requiredRoles: string[], userRoles: string[]): boolean {
    return !!userRoles.filter((role) => requiredRoles.includes(role)).length;
  }
}
