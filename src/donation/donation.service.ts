import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';

@Injectable()
export class DonationService {
  constructor(private readonly prisma: PrismaService) {}
  async create(amount: number, image: string, userId: number, fundId: number) {
    return await this.prisma.donations.create({
      data: {
        amount,
        image,
        donator: {
          connect: {
            id: userId,
          },
        },
        fund: {
          connect: {
            id: fundId,
          },
        },
      },
    });
  }


  async byFund(id: number) {
    return await this.prisma.donations.findMany({ where: { fundId: id } });
  }

  async byDonator(email: string) {
    return await this.prisma.donations.findMany({ 
      where: { 
        donator: 
        { 
          email 
        } 
      } 
    });
  }

  remove(id: number) {
    return `This action removes a #${id} donation`;
  }
}
