import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { config } from 'dotenv';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';

config();
@Injectable()
export class TwitchAppService {
    constructor(
        private readonly usersService: UsersService,
        private readonly prisma: PrismaService,
    ) {}

    async reactionFollowChannel(userId: number, params, area, cbCheckTrigger): Promise<any> {
        const twitch = await this.usersService.getServiceToken(userId, 'twitch');
        if (twitch.token == '') return;

        const twitchAccountId = await axios
            .get('https://api.twitch.tv/helix/users', {
                headers: {
                    Authorization: `Bearer ${twitch.token}`,
                    'Client-Id': process.env.TWITCH_CLIENT_ID,
                },
            })
            .then((response) => {
                return response.data.data[0].id;
            })
            .catch((error) => console.log(error));

        const channelAccountId = await axios
            .get(`https://api.twitch.tv/helix/search/channels?query=${params['1']}&first=1`, {
                headers: {
                    Authorization: `Bearer ${twitch.token}`,
                    'Client-Id': process.env.TWITCH_CLIENT_ID,
                },
            })
            .then((response) => {
                return response.data.data[0].id;
            })
            .catch((error) => console.log(error));

        await axios
            .post(
                `https://api.twitch.tv/helix/users/follows?from_id=${twitchAccountId}&to_id=${channelAccountId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${twitch.token}`,
                        'Client-Id': process.env.TWITCH_CLIENT_ID,
                    },
                },
            )
            .catch((error) => console.log(error));

        await this.prisma.areas.update({
            where: { id: area.id },
            data: { lastTrigger: new Date(), enabled: false },
        });

        return;
    }

    async actionChannelIsLive(userId: number, params) {
        const twitch = await this.usersService.getServiceToken(userId, 'twitch');
        if (twitch.token == '') return;

        const channelAccountId = await axios
            .get(`https://api.twitch.tv/helix/search/channels?query=${params['1']}&first=1`, {
                headers: {
                    Authorization: `Bearer ${twitch.token}`,
                    'Client-Id': process.env.TWITCH_CLIENT_ID,
                },
            })
            .then((response) => {
                return response.data.data[0].id;
            })
            .catch((error) => console.log(error));

        const channelInfo = await axios
            .get(`https://api.twitch.tv/helix/streams?user_id=${channelAccountId}`, {
                headers: {
                    Authorization: `Bearer ${twitch.token}`,
                    'Client-Id': process.env.TWITCH_CLIENT_ID,
                },
            })
            .then((response) => {
                return response.data.data;
            });
        if (channelInfo.length == 0) return false;
        return true;
    }
}
