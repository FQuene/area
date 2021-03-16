import { Injectable } from '@nestjs/common';

@Injectable()
export class TimerAppService {
    async actionCurrentDateIs(date: Date) {
        if (date.getTime() <= new Date().getTime()) return true;
        return false;
    }

    async actionCurrentTimeIs(hour: string) {
        const h = hour.charAt(0) + hour.charAt(1);
        const m = hour.charAt(3) + hour.charAt(4);

        if (parseInt(h) <= new Date().getHours() && parseInt(m) <= new Date().getMinutes())
            return true;
        return false;
    }
}
