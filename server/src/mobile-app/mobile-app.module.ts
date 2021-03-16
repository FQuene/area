import { Module } from '@nestjs/common';
import { MobileAppService } from './mobile-app.service';
import { MobileAppController } from './mobile-app.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    controllers: [MobileAppController],
    providers: [MobileAppService, PrismaService],
})
export class MobileAppModule {}
