import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { SchedulerController } from './scheduler.controller';
import { TimerAppService } from '../timer-app/timer-app.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TwitchAppService } from 'src/twitch-app/twitch-app.service';
import { ReactionsList } from './reactions.list';
import { UsersService } from 'src/users/users.service';
import { WeatherAppService } from 'src/weather-app/weather-app.service';
import { SpotifyAppService } from 'src/spotify-app/spotify-app.service';
import { NotifsAppService } from 'src/notifs-app/notifs-app.service';
import { MailAppService } from 'src/mail-app/mail-app.service';
import { MobileAppService } from 'src/mobile-app/mobile-app.service';
import { DiscordService } from 'src/discord/discord.service';
import { InstagramAppService } from 'src/instagram-app/instagram-app.service';

@Module({
    controllers: [SchedulerController],
    providers: [
        SchedulerService,
        ReactionsList,
        TimerAppService,
        PrismaService,
        TwitchAppService,
        WeatherAppService,
        SpotifyAppService,
        UsersService,
        NotifsAppService,
        MailAppService,
        MobileAppService,
        DiscordService,
        InstagramAppService,
    ],
})
export class SchedulerModule {}
