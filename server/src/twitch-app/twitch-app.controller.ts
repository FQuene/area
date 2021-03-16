import { Controller } from '@nestjs/common';
import { TwitchAppService } from './twitch-app.service';

@Controller('twitch-app')
export class TwitchAppController {
    constructor(private readonly twitchAppService: TwitchAppService) {}
}
