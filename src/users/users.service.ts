import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { UserDocument, User as UserSchema } from './schemas/user.schema';
import { User } from './user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserSchema.name) private userModel: Model<UserDocument>,
  ) {}

  async create(user: User): Promise<UserDocument | undefined> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async register(user: User) {
    const { username, password } = user;
    if (!username || username === '') {
      throw new HttpException(
        'Email fied is mandatory',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!password || password === '') {
      throw new HttpException(
        'Password fied is mandatory',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!username || username === '') {
      throw new HttpException(
        'User name fied is mandatory',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const createdUser = await this.create({
        ...user,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      console.log('createdUser :', createdUser);
      return createdUser;
    } catch (error) {
      if (error?.code === 11000) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      console.log(error);
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async find(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(username: string): Promise<User | undefined> {
    return await this.userModel.findOne({ username });
  }
  async getUserRole(_id: string): Promise<any> {
    return await this.userModel.findOne({ _id }).select({ roles: 1, _id: 0 });
  }

  async update(id: string, user: User): Promise<any> {
    if (user.password) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return this.userModel.updateOne(
        { _id: id },
        { ...user, password: hashedPassword },
      );
    }
    return this.userModel.updateOne({ _id: id }, { ...user });
  }

  async delete(id: string): Promise<any> {
    return this.userModel.deleteOne({ _id: id });
  }
}
