import { Controller } from '@nestjs/common';
import { SpotifyAppService } from './spotify-app.service';

@Controller('spotify-app')
export class SpotifyAppController {
    constructor(private readonly spotifyAppService: SpotifyAppService) {}
}
