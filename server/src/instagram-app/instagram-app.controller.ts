import { Controller } from '@nestjs/common';
import { InstagramAppService } from './instagram-app.service';

@Controller('instagram-app')
export class InstagramAppController {
    constructor(private readonly instagramAppService: InstagramAppService) {}
}
