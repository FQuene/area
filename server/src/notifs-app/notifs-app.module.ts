import { Module } from '@nestjs/common';
import { NotifsAppService } from './notifs-app.service';
import { NotifsAppController } from './notifs-app.controller';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    controllers: [NotifsAppController],
    providers: [NotifsAppService, UsersService, PrismaService],
})
export class NotifsAppModule {}
