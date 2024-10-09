import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FundService } from './fund.service';
import { CreateFundDto } from './dto/create-fund.dto';
import { UpdateFundDto } from './dto/update-fund.dto';
import { error } from 'console';

@Controller('fund')
export class FundController {
  constructor(private readonly fundService: FundService) { }

  @Post()
  create(@Body() createFundDto: CreateFundDto) {
    createFundDto.goal = Number(createFundDto.goal);
    return this.fundService.create(createFundDto, 1);
  }

  @Get()
  findAll() {
    return this.fundService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fundService.findOne(+id);
  }
}
