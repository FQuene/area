import { Module } from '@nestjs/common';
import { TwitchAppService } from './twitch-app.service';
import { TwitchAppController } from './twitch-app.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
    controllers: [TwitchAppController],
    providers: [TwitchAppService, PrismaService, UsersService],
})
export class TwitchAppModule {}
