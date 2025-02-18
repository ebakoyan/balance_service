import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateBalanceDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('balance')
  updateBalance(@Body() dto: UpdateBalanceDto) {
    return this.userService.updateBalance(dto);
  }
}
