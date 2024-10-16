import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/lib/prisma.service';
import { CloudinaryService } from 'src/lib/cloudinary.service';

@Module({
  controllers: [DonationController],
  providers: [DonationService, PrismaService, CloudinaryService],
})
export class DonationModule { }
