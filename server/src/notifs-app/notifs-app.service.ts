import { Injectable } from '@nestjs/common';

import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { config } from 'dotenv';

config();
@Injectable()
export class NotifsAppService {
    constructor(private readonly prisma: PrismaService) {}

    async reactionSendNotif(userId, params, area, cbCheckTrigger) {
        if (area.lastTrigger == null) null;
        else if (cbCheckTrigger(area.lastTrigger) < 10) return;

        const token = await this.prisma.tokens.findFirst({
            where: { parent: userId, service: 'notifs' },
        });

        if (token == null || token.enabled == false) return false;

        const title = params['1'];
        const message = params['2'];

        await axios
            .post('https://api.pushover.net/1/messages.json', {
                token: process.env.PUSHALERT_KEY,
                user: token.token,
                message: message,
                title: title,
            })
            .catch((error) => console.log(error));

        await this.prisma.areas.update({
            where: { id: area.id },
            data: { lastTrigger: new Date() },
        });
        return;
    }
}
