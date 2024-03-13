// is-login.middleware.ts
import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class IsLoginMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const jwtToken = req.headers['token'];

    if (!jwtToken) {
      throw new BadRequestException('Token Not Provided');
    }
    const tokenString = Array.isArray(jwtToken) ? jwtToken[0] : jwtToken;
    const user = jwt.verify(tokenString, process.env.JWT_SECRET);
    req['userExist'] = user;

    next();
  }
}
