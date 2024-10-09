import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FundModule } from './fund/fund.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [FundModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
