import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Response, Request } from 'express';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private usersService: UsersService) { }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    try {
      return this.authService.login(loginDto)
    } catch (error) {
      return error
    }
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const originalPW = createUserDto.password
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10)
      await this.usersService.create(createUserDto)

      return this.authService.login({ email: createUserDto.email, password: originalPW })
    } catch (error) {
      return error.message
    }

  }

  @Get('me')
  async me(@Res() res: Response, @Req() req: Request) {
    try {
      const user = res.locals.user
      return res.status(200).json({
        token: req.headers.authorization,
        name: user.name,
        email: user.email,
        phone: user.phone,
        image: user.image
      })
    } catch (error) {
      console.log(error)
    }

  }
}
