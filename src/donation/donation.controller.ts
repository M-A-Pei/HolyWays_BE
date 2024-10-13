import { Controller, Get, Post, Body, Param, Delete, Res } from '@nestjs/common';
import { DonationService } from './donation.service';
import { Response } from 'express';

@Controller('donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Post("/:fundId")
  async create(@Body() body:{amount: number, image: string}, @Res() res: Response, @Param() param: any) {
    const userId = res.locals.user.id;
    const fundId = Number(param.fundId);
    res.json(await this.donationService.create(body.amount, body.image, userId, fundId))
  }

  @Get('/byFund/:id')
  byFund(@Param('id') id: string) {
    return this.donationService.byFund(+id);
  }

  @Get('/byDonator/:email')
  byDonator(@Param('email') email: string) {
    return this.donationService.byDonator(email);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donationService.remove(+id);
  }
}
