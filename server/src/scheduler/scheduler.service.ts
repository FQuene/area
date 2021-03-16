import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { TimerAppService } from 'src/timer-app/timer-app.service';
import { ReactionsList } from './reactions.list';
import { TwitchAppService } from 'src/twitch-app/twitch-app.service';
import { WeatherAppService } from 'src/weather-app/weather-app.service';
import { SpotifyAppService } from 'src/spotify-app/spotify-app.service';
import { InstagramAppService } from 'src/instagram-app/instagram-app.service';
import { MailAppService } from 'src/mail-app/mail-app.service';
import { DiscordService } from 'src/discord/discord.service';

@Injectable()
export class SchedulerService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly reactionsList: ReactionsList,
        private readonly timerAppService: TimerAppService,
        private readonly twitchAppService: TwitchAppService,
        private readonly weatherAppService: WeatherAppService,
        private readonly spotifyAppService: SpotifyAppService,
        private readonly instagramAppService: InstagramAppService,
        private readonly mailAppService: MailAppService,
        private readonly discordAppService: DiscordService,
    ) {}

    checkLastTrigger(date: Date) {
        const ms = new Date().getTime() - date.getTime();
        const calc = 1000 * 60;
        const minute = ms / calc;
        return minute;
    }

    @Cron(CronExpression.EVERY_10_SECONDS)
    async handleTimerActionCurrentDate() {
        const areas = await this.prisma.areas.findMany({
            where: { actionId: 'timer_action_date' },
        });

        areas.forEach((area) => {
            if (area.enabled == false) return;

            const date = new Date(area.actionParams['1']);

            this.timerAppService.actionCurrentDateIs(date).then((response) => {
                if (response == false) return;

                this.reactionsList.list.forEach((element) => {
                    if (element.reactionId == area.reactionId)
                        element.reactionCall(
                            area.parent,
                            area.reactionParams,
                            area,
                            this.checkLastTrigger,
                        );
                });
            });
        });
    }

    @Cron(CronExpression.EVERY_10_SECONDS)
    async handleTimerActionCurrentTimeIs() {
        const areas = await this.prisma.areas.findMany({
            where: { actionId: 'timer_action_time' },
        });

        areas.forEach((area) => {
            if (area.enabled == false) return;

            this.timerAppService.actionCurrentTimeIs(area.actionParams['1']).then((response) => {
                if (response == false) return;

                this.reactionsList.list.forEach((element) => {
                    if (element.reactionId == area.reactionId) {
                        element.reactionCall(
                            area.parent,
                            area.reactionParams,
                            area,
                            this.checkLastTrigger,
                        );
                    }
                });
            });
        });
    }

    @Cron(CronExpression.EVERY_10_SECONDS)
    async handleTwitchActionChannelIsLive() {
        const areas = await this.prisma.areas.findMany({
            where: { actionId: 'twitch_action_channel_is_live' },
        });

        areas.forEach((area) => {
            if (area.enabled == false) return;

            this.twitchAppService
                .actionChannelIsLive(area.parent, area.actionParams)
                .then((response) => {
                    if (response == false) return;
                    this.reactionsList.list.forEach((element) => {
                        if (element.reactionId == area.reactionId) {
                            element.reactionCall(
                                area.parent,
                                area.reactionParams,
                                area,
                                this.checkLastTrigger,
                            );
                        }
                    });
                });
        });
    }

    @Cron(CronExpression.EVERY_10_SECONDS)
    async handleWeatherActionCurrentTempIs() {
        const areas = await this.prisma.areas.findMany({
            where: { actionId: 'weather_action_temp_is' },
        });

        areas.forEach((area) => {
            if (area.enabled == false) return;

            this.weatherAppService.actionCurrentTempIs(area.actionParams).then((response) => {
                if (response == false) return;
                this.reactionsList.list.forEach((element) => {
                    if (element.reactionId == area.reactionId) {
                        element.reactionCall(
                            area.parent,
                            area.reactionParams,
                            area,
                            this.checkLastTrigger,
                        );
                    }
                });
            });
        });
    }

    @Cron(CronExpression.EVERY_10_SECONDS)
    async handleWeatherActionCurrentTempFeelsLikeIs() {
        const areas = await this.prisma.areas.findMany({
            where: { actionId: 'weather_action_temp_feelslike_is' },
        });
        areas.forEach((area) => {
            if (area.enabled == false) return;

            this.weatherAppService
                .actionCurrentTempFeelsLikeIs(area.actionParams)
                .then((response) => {
                    if (response == false) return;
                    this.reactionsList.list.forEach((element) => {
                        if (element.reactionId == area.reactionId) {
                            element.reactionCall(
                                area.parent,
                                area.reactionParams,
                                area,
                                this.checkLastTrigger,
                            );
                        }
                    });
                });
        });
    }

    @Cron(CronExpression.EVERY_10_SECONDS)
    async handleWeatherActionCurrentHumidityIs() {
        const areas = await this.prisma.areas.findMany({
            where: { actionId: 'weather_action_humidity_is' },
        });
        areas.forEach((area) => {
            if (area.enabled == false) return;

            this.weatherAppService.actionCurrentHumidityIs(area.actionParams).then((response) => {
                if (response == false) return;
                this.reactionsList.list.forEach((element) => {
                    if (element.reactionId == area.reactionId) {
                        element.reactionCall(
                            area.parent,
                            area.reactionParams,
                            area,
                            this.checkLastTrigger,
                        );
                    }
                });
            });
        });
    }

    @Cron(CronExpression.EVERY_10_SECONDS)
    async handleWeatherActionCurrentWindIs() {
        const areas = await this.prisma.areas.findMany({
            where: { actionId: 'weather_action_wind_is' },
        });
        areas.forEach((area) => {
            if (area.enabled == false) return;

            this.weatherAppService.actionCurrentWindIs(area.actionParams).then((response) => {
                if (response == false) return;
                this.reactionsList.list.forEach((element) => {
                    if (element.reactionId == area.reactionId) {
                        element.reactionCall(
                            area.parent,
                            area.reactionParams,
                            area,
                            this.checkLastTrigger,
                        );
                    }
                });
            });
        });
    }

    @Cron(CronExpression.EVERY_10_SECONDS)
    async handleSpotifyActionLastMusicListenedIs() {
        const areas = await this.prisma.areas.findMany({
            where: { actionId: 'spotify_action_last_music_listened_is' },
        });

        areas.forEach((area) => {
            if (area.enabled == false) return;

            this.spotifyAppService
                .actionLastMusicListenedIs(area.parent, area.actionParams)
                .then((response) => {
                    if (response == false) return;
                    this.reactionsList.list.forEach((element) => {
                        if (element.reactionId == area.reactionId) {
                            element.reactionCall(
                                area.parent,
                                area.reactionParams,
                                area,
                                this.checkLastTrigger,
                            );
                        }
                    });
                });
        });
    }

    @Cron(CronExpression.EVERY_5_SECONDS)
    async handleInstagramActionWinFollowers() {
        const areas = await this.prisma.areas.findMany({
            where: { actionId: 'instagram_action_win_followers' },
        });

        areas.forEach((area) => {
            if (area.enabled == false) return;
            this.instagramAppService
                .actionWinFollowers(area.actionParams, area.id)
                .then((response) => {
                    if (response == false) return;
                    this.reactionsList.list.forEach((element) => {
                        if (element.reactionId == area.reactionId) {
                            element.reactionCall(
                                area.parent,
                                area.reactionParams,
                                area,
                                this.checkLastTrigger,
                            );
                        }
                    });
                });
        });
    }

    @Cron(CronExpression.EVERY_10_SECONDS)
    async handleInstagramActionLoseFollowers() {
        const areas = await this.prisma.areas.findMany({
            where: { actionId: 'instagram_action_lose_followers' },
        });

        await areas.forEach((area) => {
            if (area.enabled == false) return;

            this.instagramAppService
                .actionLoseFollowers(area.actionParams, area.id)
                .then((response) => {
                    if (response == false) return;
                    this.reactionsList.list.forEach((element) => {
                        if (element.reactionId == area.reactionId) {
                            element.reactionCall(
                                area.parent,
                                area.reactionParams,
                                area,
                                this.checkLastTrigger,
                            );
                        }
                    });
                });
        });
    }

    // @Cron(CronExpression.EVERY_10_SECONDS)
    // async handleInstagramActionWinFollowings() {
    //     const areas = await this.prisma.areas.findMany({
    //         where: { actionId: 'instagram_action_win_followings' },
    //     });

    //     areas.forEach((area) => {
    //         if (area.enabled == false) return;

    //         this.instagramAppService
    //             .actionWinFollowings(area.actionParams, area.id)
    //             .then((response) => {
    //                 if (response == false) return;
    //                 this.reactionsList.list.forEach((element) => {
    //                     if (element.reactionId == area.reactionId) {
    //                         element.reactionCall(
    //                             area.parent,
    //                             area.reactionParams,
    //                             area,
    //                             this.checkLastTrigger,
    //                         );
    //                     }
    //                 });
    //             });
    //     });
    // }

    // @Cron(CronExpression.EVERY_10_SECONDS)
    // async handleInstagramActionLoseFollowings() {
    //     const areas = await this.prisma.areas.findMany({
    //         where: { actionId: 'instagram_action_lose_followings' },
    //     });

    //     areas.forEach((area) => {
    //         if (area.enabled == false) return;

    //         this.instagramAppService
    //             .actionLoseFollowings(area.actionParams, area.id)
    //             .then((response) => {
    //                 if (response == false) return;
    //                 this.reactionsList.list.forEach((element) => {
    //                     if (element.reactionId == area.reactionId) {
    //                         element.reactionCall(
    //                             area.parent,
    //                             area.reactionParams,
    //                             area,
    //                             this.checkLastTrigger,
    //                         );
    //                     }
    //                 });
    //             });
    //     });
    // }
}
