import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { config } from 'dotenv';
import { PrismaService } from 'src/prisma/prisma.service';
import { use } from 'passport';

config();
@Injectable()
export class MailAppService {
    constructor(private prisma: PrismaService) {}

    async reactionSendMail(userId, params, area, cbCheckTrigger) {
        if (area.lastTrigger == null) null;
        else if (cbCheckTrigger(area.lastTrigger) < 10) return;

        const user = await this.prisma.users.findFirst({
            where: { id: userId },
            select: { email: true },
        });

        const dest = params['1'];
        const object = params['2'];
        const mail = params['3'];

        const mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        const info = await mailTransporter.sendMail({
            from: `"${user.email}" <foo@example.com>`,
            to: dest,
            subject: object,
            text: mail,
        });

        if (info.messageId)
            await this.prisma.areas.update({
                where: { id: area.id },
                data: { lastTrigger: new Date() },
            });
        return;
    }
}
