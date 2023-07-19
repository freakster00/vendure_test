import { Module } from '@nestjs/common';
import { VendureTestService } from './vendure-test.service';
import { VendureTestController } from './vendure-test.controller';


@Module({
  providers: [VendureTestService],
  controllers: [VendureTestController]
})
export class VendureTestModule {}
