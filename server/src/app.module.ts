import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerModule } from './scheduler/scheduler.module';
import { TimerAppModule } from './timer-app/timer-app.module';
import { TwitchAppModule } from './twitch-app/twitch-app.module';
import { WeatherAppModule } from './weather-app/weather-app.module';
import { SpotifyAppModule } from './spotify-app/spotify-app.module';
import { NotifsAppModule } from './notifs-app/notifs-app.module';
import { MailAppModule } from './mail-app/mail-app.module';
import { MobileAppModule } from './mobile-app/mobile-app.module';
import { InstagramAppModule } from './instagram-app/instagram-app.module';
import { DiscordModule } from './discord/discord.module';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        ScheduleModule.forRoot(),
        SchedulerModule,
        TimerAppModule,
        TwitchAppModule,
        WeatherAppModule,
        SpotifyAppModule,
        NotifsAppModule,
        MailAppModule,
        MobileAppModule,
        InstagramAppModule,
        DiscordModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
