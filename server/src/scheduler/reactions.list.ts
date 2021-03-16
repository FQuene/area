import { TwitchAppService } from 'src/twitch-app/twitch-app.service';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { NotifsAppService } from 'src/notifs-app/notifs-app.service';
import { MailAppService } from 'src/mail-app/mail-app.service';
import { MobileAppService } from 'src/mobile-app/mobile-app.service';
import { DiscordService } from 'src/discord/discord.service';

interface IReaction {
    service: string;
    reactionId: string;
    reactionCall: any;
}

@Injectable()
export class ReactionsList {
    public list: IReaction[];

    constructor(
        private readonly twitchAppService: TwitchAppService,
        private readonly notifsAppService: NotifsAppService,
        private readonly mailAppService: MailAppService,
        private readonly userService: UsersService,
        private readonly mobileAppService: MobileAppService,
        private readonly discordAppService: DiscordService,
    ) {
        this.list = [
            {
                service: 'twitch',
                reactionId: 'twitch_reaction_follow',
                reactionCall: (userId, params, area, cbCheckTrigger) =>
                    this.twitchAppService.reactionFollowChannel(
                        userId,
                        params,
                        area,
                        cbCheckTrigger,
                    ),
            },
            {
                service: 'notifs',
                reactionId: 'notifs_reaction_send',
                reactionCall: (userId, params, area, cbCheckTrigger) =>
                    this.notifsAppService.reactionSendNotif(userId, params, area, cbCheckTrigger),
            },
            {
                service: 'mails',
                reactionId: 'mail_reaction_send_mail',
                reactionCall: (userId, params, area, cbCheckTrigger) =>
                    this.mailAppService.reactionSendMail(userId, params, area, cbCheckTrigger),
            },
            {
                service: 'mobile',
                reactionId: 'mobile_reaction_call',
                reactionCall: (userId, params, area, cbCheckTrigger) =>
                    this.mobileAppService.reactionCall(userId, params, area, cbCheckTrigger),
            },
            {
                service: 'mobile',
                reactionId: 'mobile_reaction_sms',
                reactionCall: (userId, params, area, cbCheckTrigger) =>
                    this.mobileAppService.reactionSendSMS(userId, params, area, cbCheckTrigger),
            },
            {
                service: 'discord',
                reactionId: 'discord_send_webhook_message',
                reactionCall: (userId, params, area, cbCheckTrigger) =>
                    this.discordAppService.reactionDiscordSendWebookMessage(
                        userId,
                        params,
                        area,
                        cbCheckTrigger,
                    ),
            },
        ];
    }
}
