import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../lib/prisma.service';
import { CloudinaryService } from '../lib/cloudinary.service';

@Module({
  controllers: [DonationController],
  providers: [DonationService, PrismaService, CloudinaryService],
})
export class DonationModule { }
