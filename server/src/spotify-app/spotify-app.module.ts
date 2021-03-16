import { Module } from '@nestjs/common';
import { SpotifyAppService } from './spotify-app.service';
import { SpotifyAppController } from './spotify-app.controller';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    controllers: [SpotifyAppController],
    providers: [SpotifyAppService, PrismaService, UsersService],
})
export class SpotifyAppModule {}
