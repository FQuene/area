import { Module } from '@nestjs/common';
import { WeatherAppService } from './weather-app.service';
import { WeatherAppController } from './weather-app.controller';

@Module({
    controllers: [WeatherAppController],
    providers: [WeatherAppService],
})
export class WeatherAppModule {}
