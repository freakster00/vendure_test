import { Controller, Get } from '@nestjs/common';
import { VendureTestService } from './vendure-test.service';

@Controller('vendure-test')
export class VendureTestController {
constructor(private readonly vendureTestService:VendureTestService){}
    @Get('plaintest')
    fetchNormalData(){
        return this.vendureTestService.fetchNormalData()
    }

    @Get('hello')
    return1(){
    return 1;
    }

    @Get('stellatetest')
    fetchDataFromStellate(){
        return this.vendureTestService.fetchDataFromStellate()
    }

    @Get('stellatewithredistest')
    fetchDataFromStellatewithRedis(){
        return this.vendureTestService.fetchDataFromStellatewithRedis()
    }
}
