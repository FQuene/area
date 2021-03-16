import { Controller } from '@nestjs/common';
import { MobileAppService } from './mobile-app.service';

@Controller('mobile-app')
export class MobileAppController {
  constructor(private readonly mobileAppService: MobileAppService) {}
}
