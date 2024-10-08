import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FundModule } from './fund/fund.module';

@Module({
  imports: [FundModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
