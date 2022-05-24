import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/user.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(user: User) {
    console.log('register');
    return this.usersService.register(user);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    console.log('validateUser');
    if (!email)
      throw new HttpException('Email is mandatory', HttpStatus.BAD_REQUEST);
    if (!pass)
      throw new HttpException('Password is mandatory', HttpStatus.BAD_REQUEST);
    const user = await this.usersService.findOne(email);
    const isPasswordMatching = await bcrypt.compare(pass, user.password);
    if (!user || !isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
    user.password = undefined;
    return user;
  }

  async login(user: User) {
    const payload = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      user: { id: user._id, email: user.email, sub: user.email },
    };
    return {
      message: 'ok',
      access_token: this.jwtService.sign(payload),
    };
  }
}
