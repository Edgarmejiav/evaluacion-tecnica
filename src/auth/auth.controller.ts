import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['username', 'password'],
    },
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return this.authService.login(req.user);
  }

  @Post('register')
  create(@Body() data: CreateUserDto) {
    return this.authService.register(data);
  }
}
