import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from 'src/dto/login.dto';
import { Response, Request } from 'express';
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
    const originalPW = createUserDto.password
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10)
    await this.usersService.create(createUserDto)

    return this.authService.login({ email: createUserDto.email, password: originalPW })
  }

  @Get('me')
  async me(@Res() res: Response, @Req() req: Request) {
    try {
      const user = res.locals.user
      return res.status(200).json({
        token: req.headers.authorization,
        name: user.name,
        email: user.email,
        phone: user.phone
      })
    } catch (error) {
      console.log(error)
    }

  }
}
