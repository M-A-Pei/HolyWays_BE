import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/lib/cloudinary.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly cloudinaryService: CloudinaryService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get('/email/:email')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    const id = res.locals.user.id
    res.json(this.usersService.update(+id, updateUserDto));
  }

  @Patch('/pfp')
  @UseInterceptors(FileInterceptor('image'))
  async updatePfp(@UploadedFile() image: Express.Multer.File, @Res() res: Response) {
    const id = res.locals.user.id
    const uploadedImg = await this.cloudinaryService.uploadImage(image);

    res.json(this.usersService.updatePfp(uploadedImg, +id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
