import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/lib/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }
  async create(createUserDto: CreateUserDto) {
    const checkEmail = await this.findByEmail(createUserDto.email);
    if (checkEmail) {
      throw new Error('Email already exists');
    }

    return await this.prisma.users.create({ data: createUserDto });
  }

  async findAll() {
    return this.prisma.users.findMany();
  }

  findOne(id: number) {
    return this.prisma.users.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.prisma.users.findUnique({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.users.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async updatePfp(image: string, id: number) {
    return await this.prisma.users.update({
      where: { id },
      data: {
        image
      }
    })
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
