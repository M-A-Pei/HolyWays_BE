import { Controller, Get, Post, Body, Param, Res } from '@nestjs/common';
import { FundService } from './fund.service';
import { CreateFundDto } from './dto/create-fund.dto';
import { Response } from 'express';
@Controller('fund')
export class FundController {
  constructor(private readonly fundService: FundService) { }

  @Post()
  async create(@Body() createFundDto: CreateFundDto, @Res() res:Response) {
    createFundDto.goal = Number(createFundDto.goal);
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
