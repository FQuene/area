import { Module } from '@nestjs/common';
import { TimerAppService } from './timer-app.service';
import { TimerAppController } from './timer-app.controller';

@Module({
    controllers: [TimerAppController],
    providers: [TimerAppService],
})
export class TimerAppModule {}
