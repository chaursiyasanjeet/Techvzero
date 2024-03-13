import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() userdata) {
    return this.authService.createuser(userdata);
  }

  @Post('signin')
  signin(@Body() userdetail) {
    return this.authService.loginUser(userdetail);
  }
}
