import { Injectable } from '@nestjs/common';
import { CreateFundDto } from './dto/create-fund.dto';
import { UpdateFundDto } from './dto/update-fund.dto';
import { PrismaService } from 'src/lib/prisma.service';

@Injectable()
export class FundService {
  constructor(private prisma: PrismaService) { }

  async create(createFundDto: CreateFundDto, ownerId: number) {
    return await this.prisma.funds.create({
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

  findByUserEmail(email: string) {
    return this.prisma.funds.findMany({
      where: {
        owner: {
          email: email
        }
      }
    })
  }

  findOne(id: number) {
    return this.prisma.funds.findUnique({
      where: {
        id
      },
      include: {
        owner: true
      }
    });
  }
}
