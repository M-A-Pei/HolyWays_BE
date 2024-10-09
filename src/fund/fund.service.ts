import { Injectable } from '@nestjs/common';
import { CreateFundDto } from './dto/create-fund.dto';
import { UpdateFundDto } from './dto/update-fund.dto';
import { PrismaService } from 'src/lib/prisma.service';

@Injectable()
export class FundService {
  constructor(private prisma: PrismaService) { }
  create(createFundDto: CreateFundDto, ownerId: number) {
    return this.prisma.funds.create({
      data: {
        ...createFundDto,
        owner: {
          connect: {
            id: ownerId
          }
        }
      }
    });
  }

  findAll() {
    return this.prisma.funds.findMany();
  }

  findOne(id: number) {
    return this.prisma.funds.findUnique({
      where: {
        id
      }
    });
  }
}
