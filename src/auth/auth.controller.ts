import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from 'src/dto/login.dto';
import * as bcrypt from 'bcrypt'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private usersService: UsersService) { }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10)
    return this.usersService.create(createUserDto)
  }
}
