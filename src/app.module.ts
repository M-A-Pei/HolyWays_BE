import { MiddlewareConsumer, Module, NestModule, Req, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FundModule } from './fund/fund.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { authorization } from './common/middleware/authorization';
import { DonationModule } from './donation/donation.module';

@Module({
  imports: [FundModule, UsersModule, AuthModule, DonationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(authorization).forRoutes(
      {
        path: '/api/fund',
        method: RequestMethod.POST,
      },
      {
        path: '/api/users',
        method: RequestMethod.POST,
      },
      {
        path: '/api/users',
        method: RequestMethod.PATCH,
      },
      {
        path: '/api/users/pfp',
        method: RequestMethod.PATCH
      },
      '/api/auth/me',
      {
        path: '/api/donation/:fundId',
        method: RequestMethod.POST
      },
    );
  }
}
