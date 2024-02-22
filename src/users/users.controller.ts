// users.controller.ts

import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return { users: [] }; // Return some dummy data for testing
  }
}
