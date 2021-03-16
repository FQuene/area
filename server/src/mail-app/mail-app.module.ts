import { Module } from '@nestjs/common';
import { MailAppService } from './mail-app.service';
import { MailAppController } from './mail-app.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    controllers: [MailAppController],
    providers: [MailAppService, PrismaService],
})
export class MailAppModule {}