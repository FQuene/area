import { Controller } from '@nestjs/common';
import { MailAppService } from './mail-app.service';

@Controller('mail-app')
export class MailAppController {
  constructor(private readonly mailAppService: MailAppService) {}
}
