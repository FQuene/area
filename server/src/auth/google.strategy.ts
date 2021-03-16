import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly authService: AuthService) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: 'http://localhost:8080/auth/google/redirect',
            scope: ['email', 'profile'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        const { name, emails } = profile;
        const jwt = await this.authService.validateGoogleOauthLogin(
            name.givenName,
            emails[0].value,
        );
        // const user = {
        //     email: emails[0].value,
        //     firstName: name.givenName,
        //     lastName: name.familyName,
        //     picture: photos[0].value,
        //     accessToken: accessToken,
        //     refreshToken: refreshToken,
        // };
        const user = {
            jwt,
        };
        return user;
    }
}
