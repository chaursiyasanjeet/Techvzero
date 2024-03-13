import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { USER_MODEL } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  constructor(
    @InjectModel(USER_MODEL)
    private usermodel,
    private jwtService: JwtService,
  ) {}

  async createuser(createUserData) {
    try {
      const { name, email, mobile, password } = createUserData;

      if (!name || !email || !mobile || !password) {
        return { status: 'FAILED', message: 'Empty  Fields' };
      }

      const existingEmail = await this.usermodel.findOne({
        email: createUserData['email'],
      });
      const existingMobile = await this.usermodel.findOne({
        mobile: createUserData['mobile'],
      });

      if (existingEmail) {
        return { status: 'FAILED', message: 'Email already exists' };
      }

      if (existingMobile) {
        return { status: 'FAILED', message: 'Mobile already exists' };
      }

      createUserData['password'] = await bcrypt.hash(
        createUserData.password,
        10,
      );
      const user = await this.usermodel.create(createUserData);
      return { status: 'SUCCESS', message: 'Registered Successfully' };
    } catch (error) {
      if (error.name === 'ValidatioError') {
        throw new BadRequestException(error.errors);
      }

      throw new ServiceUnavailableException();
    }
  }
  async loginUser(userdetail) {
    try {
      const { email, password } = userdetail;
      if (!email || !password) {
        return { status: 'FAILED', message: 'Empty Fields' };
      }

      const userExist = await this.usermodel.findOne({
        email: userdetail['email'],
      });

      if (!userExist) {
        return { status: 'FAILED', message: 'Account does not exist' };
      }

      const passwdMatched = await bcrypt.compare(password, userExist.password);

      if (!passwdMatched) {
        return {
          status: 'FAILED',
          message: 'password wrong',
        };
      }

      const jwtToken = this.jwtService.sign({ user: userExist });
      return { status: 'SUCCESS', token: jwtToken };
    } catch (error) {
      if (error.name === 'ValidatioError') {
        throw new BadRequestException(error.errors);
      }

      throw new ServiceUnavailableException();
    }
  }
}
