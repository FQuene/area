import { Req } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): any {
        return this.appService.getHello();
    }

    @Get('about.json')
    getAbout(@Req() req) {
        return this.appService.about(req.ip);
    }
}
