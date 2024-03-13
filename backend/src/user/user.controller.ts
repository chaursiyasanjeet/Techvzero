import { Body, Controller, Get, Put, Req, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { request } from 'http';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('notes')
  async getNotes(@Request() request: Request) {
    return this.userService.getNotes(request);
  }

  @Put('editNotes')
  async editNotes(@Request() request: Request, @Body() noteData) {
    return this.userService.editNotes(request, noteData);
  }
}
