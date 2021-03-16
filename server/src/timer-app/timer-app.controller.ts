import { Controller } from '@nestjs/common';
import { TimerAppService } from './timer-app.service';

@Controller('timer-app')
export class TimerAppController {
    constructor(private readonly timerAppService: TimerAppService) {}
}
