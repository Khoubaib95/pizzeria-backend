import { Injectable } from '@nestjs/common';
import { getHello } from './@types';
import { getEntryPointHello } from './app_constant/const';

@Injectable()
export class AppService {
  getHello(): getHello {
    return getEntryPointHello;
  }
}
