import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import axios from 'axios';
import { config } from 'dotenv';
import { PrismaService } from 'src/prisma/prisma.service';

config();
@Injectable()
export class SpotifyAppService {
    constructor(
        private readonly usersService: UsersService,
        private readonly prisma: PrismaService,
    ) {}

    async encodeQueryData(data) {
        const ret = [];
        for (const d in data) ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
    }

    async actionLastMusicListenedIs(usersId, params) {
        const spotify = await this.usersService.getServiceToken(usersId, 'spotify');
        if (spotify == null || spotify.token == '') return;

        let accessToken;

        if (spotify.hasRefreshToken === false) {
            const headers = {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                auth: {
                    username: process.env.SPOTIFY_CLIENT_ID,
                    password: process.env.SPOTIFY_SECRET,
                },
            };

            const data = {
                grant_type: 'authorization_code',
                code: spotify.token,
                redirect_uri: 'http://localhost:8080/auth/spotify/redirect',
            };

            const info = await this.encodeQueryData(data);

            accessToken = await axios
                .post('https://accounts.spotify.com/api/token', info, headers)
                .then(async (response) => {
                    await this.prisma.tokens.updateMany({
                        where: { parent: usersId, service: 'spotify' },
                        data: { token: response.data.refresh_token, hasRefreshToken: true },
                    });
                    return response.data.access_token;
                })
                .catch((error) => console.log(error));
        } else {
            const headers = {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                auth: {
                    username: process.env.SPOTIFY_CLIENT_ID,
                    password: process.env.SPOTIFY_SECRET,
                },
            };

            const data = {
                grant_type: 'refresh_token',
                refresh_token: spotify.token,
            };

            const info = await this.encodeQueryData(data);

            accessToken = await axios
                .post('https://accounts.spotify.com/api/token', info, headers)
                .then(async (response) => {
                    await this.prisma.tokens.updateMany({
                        where: { parent: usersId, service: 'spotify' },
                        data: { token: response.data.refresh_token },
                    });
                    return response.data.access_token;
                })
                .catch((error) => console.log(error));
        }

        const lastMusicListened = await axios({
            method: 'GET',
            url: 'https://api.spotify.com/v1/me/player/recently-played',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                if (
                    response.data.items[0].track.album.artists[0].name.toLowerCase() ==
                        params['1'].toLowerCase() &&
                    response.data.items[0].track.name.toLowerCase() == params['2'].toLowerCase()
                )
                    return true;
                else return false;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
        return lastMusicListened;
    }
}