import { Controller, Get, Post, Body, Param, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FundService } from './fund.service';
import { CreateFundDto } from './dto/create-fund.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { v2 as cloudinary } from 'cloudinary'; // Import Cloudinary
import { Readable } from 'stream';
import { CloudinaryService } from 'src/lib/cloudinary.service';

@Controller('fund')
export class FundController {
  constructor(private readonly fundService: FundService, private cloudinaryService: CloudinaryService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() createFundDto: CreateFundDto, @Res() res: Response, @UploadedFile() image: Express.Multer.File,) {
    const uploadedImg = await this.cloudinaryService.uploadImage(image);

    createFundDto.goal = Number(createFundDto.goal);
    createFundDto.image = uploadedImg

    console.log(createFundDto)
    res.json(this.fundService.create(createFundDto, res.locals.user.id));
  }

  @Get()
  findAll() {
    return this.fundService.findAll();
  }

  @Get('/byUserEmail/:email')
  findByUserEmail(@Param() param: any) {
    return this.fundService.findByUserEmail(param.email);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fundService.findOne(+id);
  }
}
