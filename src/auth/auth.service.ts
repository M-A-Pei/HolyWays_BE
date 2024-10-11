import { Injectable } from '@nestjs/common';
import { LoginDto } from 'src/dto/login.dto';
import { UsersService } from 'src/users/users.service';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) { }
    async login(loginDto: LoginDto) {
        const checkIfUserExists = await this.usersService.findByEmail(loginDto.email)
        if (checkIfUserExists == null) {
            throw new Error("user doesnt exist")
        }

        console.log(loginDto)

        const isMatch = await bcrypt.compare(loginDto.password, checkIfUserExists.password)
        if (!isMatch) {
            throw new Error("wrong password")
        }

        const token = jwt.sign(checkIfUserExists, process.env.SECRET || "secret", {
            expiresIn: "1h",
        });

        return token
    }
}
