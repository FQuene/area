import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { config } from 'dotenv';
import { PrismaService } from 'src/prisma/prisma.service';

config();
@Injectable()
export class MobileAppService {
    constructor(private prisma: PrismaService) {}

    async reactionCall(usersID, params, area, cbCheckTrigger) {
        if (area.lastTrigger == null) null;
        else if (cbCheckTrigger(area.lastTrigger) < 10) return;

        let number = params[1].substring(1);
        number = '+33' + number;

        await axios
            .post(
                'https://clicksend.p.rapidapi.com/voice/send',
                {
                    messages: [
                        {
                            source: 'mashape',
                            body: params['2'],
                            to: number,
                            lang: 'fr-fr',
                            voice: 'male',
                            schedule: 1436874701,
                            custom_string: 'this is a test m',
                        },
                    ],
                },
                {
                    headers: {
                        'content-type': 'application/json',
                        authorization: `Basic ${process.env.MOBILE_APP_TOKEN}`,
                        'x-rapidapi-key': process.env.R_API_KEY,
                        'x-rapidapi-host': 'clicksend.p.rapidapi.com',
                    },
                },
            )
            .catch((error) => console.log(error));

        await this.prisma.areas.update({
            where: { id: area.id },
            data: { lastTrigger: new Date() },
        });
    }

    async reactionSendSMS(usersID, params, area, cbCheckTrigger) {
        if (area.lastTrigger == null) null;
        else if (cbCheckTrigger(area.lastTrigger) < 10) return;

        let number = params[1].substring(1);
        number = '+33' + number;

        await axios
            .post(
                'https://clicksend.p.rapidapi.com/sms/send',
                {
                    messages: [
                        {
                            source: 'mashape',
                            from: 'AREA',
                            body: params['2'],
                            to: number,
                            schedule: '1452244637',
                            custom_string: 'this is a test',
                        },
                    ],
                },
                {
                    headers: {
                        'content-type': 'application/json',
                        authorization: `Basic ${process.env.MOBILE_APP_TOKEN}`,
                        'x-rapidapi-key': process.env.R_API_KEY,
                        'x-rapidapi-host': 'clicksend.p.rapidapi.com',
                    },
                },
            )
            .catch((error) => console.log(error));

        await this.prisma.areas.update({
            where: { id: area.id },
            data: { lastTrigger: new Date() },
        });
    }
}
