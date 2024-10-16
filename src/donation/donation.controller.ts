import { Controller, Get, Post, Body, Param, Delete, Res, Patch, UseInterceptors, UploadedFile } from '@nestjs/common';
import { DonationService } from './donation.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/lib/cloudinary.service';

@Controller('donation')
export class DonationController {
  constructor(private readonly donationService: DonationService, private readonly cloudinaryService: CloudinaryService) { }

  @Post("/:fundId")
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() body: { amount: number, image: string }, @Res() res: Response, @Param() param: any, @UploadedFile() image: Express.Multer.File) {
    const uploadedImg = await this.cloudinaryService.uploadImage(image);
    body.image = uploadedImg
    const userId = res.locals.user.id;
    const fundId = Number(param.fundId);
    res.json(await this.donationService.create(body.amount, body.image, userId, fundId))
  }

  @Get('/byFund/:id/:confirmed')
  byFund(@Param() params: any,) {
    return this.donationService.byFund(+params.id, params.confirmed === 'true');
  }

  @Get('/byDonator/:email')
  byDonator(@Param('email') email: string) {
    return this.donationService.byDonator(email);
  }

  @Patch(':id')
  approve(@Param('id') id: string) {
    return this.donationService.approve(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donationService.remove(+id);
  }
}
