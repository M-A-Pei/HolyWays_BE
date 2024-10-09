import { MiddlewareConsumer, Module, NestModule, Req, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FundModule } from './fund/fund.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { authorization } from './common/middleware/authorization';
@Module({
  imports: [FundModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(authorization).forRoutes({
      path: '/funds',
      method: RequestMethod.POST,
    },
      {
        path: '/users',
        method: RequestMethod.POST,
      });
  }
}
