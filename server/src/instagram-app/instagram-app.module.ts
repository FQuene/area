import { Module } from '@nestjs/common';
import { InstagramAppService } from './instagram-app.service';
import { InstagramAppController } from './instagram-app.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    controllers: [InstagramAppController],
    providers: [InstagramAppService, PrismaService],
})
export class InstagramAppModule {}
