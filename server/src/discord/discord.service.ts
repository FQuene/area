import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';
import { response } from 'express';

@Injectable()
export class DiscordService {
    constructor(private prisma: PrismaService) {}

    async reactionDiscordSendWebookMessage(userId, params, area, cbCheckTrigger) {
        if (area.lastTrigger == null) null;
        else if (cbCheckTrigger(area.lastTrigger) < 10) return;

        const user = await this.prisma.users.findFirst({
            where: { id: userId },
            select: { username: true },
        });

        const webookLink = params['1'];
        const message = params['2'];

        await axios
            .post(webookLink, {
                username: user.username,
                avatar_url: `https://eu.ui-avatars.com/api/?size=256&name=${user.username}.png`,
                content: message,
            })
            .then((response) => {})
            .catch((error) => console.log(error));

        await this.prisma.areas.update({
            where: { id: area.id },
            data: { lastTrigger: new Date() },
        });
        return;
    }
}
