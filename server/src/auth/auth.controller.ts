import { Controller, Res, Post, Get, UseGuards, Body, Request, Req, Query } from '@nestjs/common';
import { Response } from 'express';
import { UserDto } from 'src/helpers/dtos/users.dto';
import { LocalAuthGuard, JwtAuthGuard, GoogleAuthGward } from './auth.guards';
import { AuthService } from './auth.service';
import { config } from 'dotenv';
import { UsersService } from 'src/users/users.service';

config();
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('register')
    async register(@Body() user: UserDto, @Res() res: Response) {
        this.authService.register(user).then((response) => {
            res.json(response);
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        return req.user;
    }

    @Get('google')
    @UseGuards(GoogleAuthGward)
    async googleAuth(@Req() req) {}

    @Get('google/redirect')
    @UseGuards(GoogleAuthGward)
    async googleAuthRedirect(@Req() req, @Res() res) {
        this.authService.googleRedirect(req, res);
    }

    @Get('twitch')
    async twitchAuth(@Req() req, @Res() res) {
        res.redirect(process.env.TWITCH_OAUTH_URL);
    }

    @Get('twitch/redirect')
    async twitchAuthRedirect(@Query() query, @Res() res) {
        res.redirect('http://localhost:8081/services/?twitch');
    }

    @Get('spotify')
    async spotifyAuth(@Req() req, @Res() res) {
        res.redirect(process.env.SPOTIFY_OAUTH_URL);
    }

    @Get('spotify/redirect')
    async spotifyAuthRedirect(@Query() query, @Res() res) {
        res.redirect('http://localhost:8081/services/?spotify#access_token=' + query.code);
    }
}
