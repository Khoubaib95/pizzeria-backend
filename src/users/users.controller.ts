import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserIsUserGuard } from '../auth/guards/user-is-user.guard';
import { User, userRole } from './user.interface';
import { UsersService } from './users.service';
import { UserDocument } from './schemas/user.schema';
import { Roles } from '../decorator/roles.decorator';

@Controller('users')
//@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(userRole.USER, userRole.ADMIN)
  getUsers(): Promise<User[]> {
    return this.usersService.find();
  }

  @Post()
  createUser(@Body() user: User): Promise<UserDocument> {
    return this.usersService.register(user);
  }

  @UseGuards(JwtAuthGuard, UserIsUserGuard)
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() user: User): Promise<any> {
    return this.usersService.update(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<any> {
    return this.usersService.delete(id);
  }
}
