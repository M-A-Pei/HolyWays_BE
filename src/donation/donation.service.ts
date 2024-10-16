import { Injectable } from '@nestjs/common';
import { PrismaService } from 'lib/prisma.service';

@Injectable()
export class DonationService {
  cloudinaryService: any;
  constructor(private readonly prisma: PrismaService) { }
  async create(amount: number, image: string, userId: number, fundId: number) {
    return await this.prisma.donations.create({
      data: {
        amount: Number(amount),
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

  async approve(id: number) {
    const donation = await this.byId(id)

    await this.prisma.funds.update({
      where: {
        id: donation.fundId
      },
      data: {
        currentFunds: {
          increment: donation.amount
        }
      }
    })

    return await this.prisma.donations.update({
      where: {
        id
      },
      data: {
        isConfirmed: true
      }
    })
  }

  async byId(id: number) {
    return await this.prisma.donations.findUnique({
      where: {
        id
      }
    })
  }


  async byFund(id: number, confirmed: boolean) {
    return await this.prisma.donations.findMany({
      where: {
        fundId: id,
        isConfirmed: confirmed
      },
      include: {
        fund: true,
        donator: true,
      }
    });
  }

  async byDonator(email: string) {
    return await this.prisma.donations.findMany({
      where: {
        donator:
        {
          email
        }
      },
      include: {
        fund: true,
        donator: true,
      }
    });
  }

  remove(id: number) {
    return `This action removes a #${id} donation`;
  }
}
