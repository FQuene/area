import { Controller } from '@nestjs/common';
import { WeatherAppService } from './weather-app.service';

@Controller('weather-app')
export class WeatherAppController {
    constructor(private readonly weatherAppService: WeatherAppService) {}
}
