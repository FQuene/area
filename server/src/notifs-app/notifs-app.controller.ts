import { Controller } from '@nestjs/common';
import { NotifsAppService } from './notifs-app.service';

@Controller('notifs-app')
export class NotifsAppController {
    constructor(private readonly notifsAppService: NotifsAppService) {}
}
