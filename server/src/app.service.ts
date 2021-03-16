import { Injectable } from '@nestjs/common';
import about from './about';

@Injectable()
export class AppService {
    getHello(): any {
        return { message: 'Welcome to the AREA API ! 📦 ' };
    }

    about(req): any {
        about.client.host = req;
        about.server.current_time = Math.floor(Date.now() / 1000);
        return about;
    }
}
