import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';


import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { VendureTestModule } from './vendure-test/vendure-test.module';


@Module({
    imports:[MessagesModule, UserModule, AuthModule, VendureTestModule
     ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
