import { Injectable, Req, Res } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from 'src/helpers/dtos/users.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private prisma: PrismaService,
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        if (user == undefined) return null;

        const unhashedPassword = await bcrypt.compare(pass, user.password);

        if (user && unhashedPassword) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async register(user: UserDto) {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        const userData: UserDto = {
            accType: user.accType,
            username: user.username,
            email: user.email,
            password: hashedPassword,
        };

        const response = await this.usersService.createUser(userData);
        return response;
    }

    async login(user) {
        const payload = { username: user.username, id: user.id, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateGoogleOauthLogin(username: string, email: string): Promise<string> {
        try {
            const user = await this.prisma.users.findUnique({
                where: {
                    email: email,
                },
            });

            if (user == undefined) {
                const newUser = await this.prisma.users.create({
                    data: {
                        accType: 'google',
                        username: username,
                        email: email,
                        password: null,
                        Tokens: {
                            create: [
                                {
                                    service: 'twitch',
                                    token: '',
                                    enabled: false,
                                    color: '#a970ff',
                                    otherParams: {},
                                },
                                {
                                    service: 'spotify',
                                    token: '',
                                    enabled: false,
                                    color: '#1DB954',
                                    otherParams: {},
                                },
                                {
                                    service: 'notifs',
                                    token: '',
                                    enabled: false,
                                    color: '#229EC6',
                                    otherParams: {},
                                },
                            ],
                        },
                    },
                });

                const payload = {
                    username: newUser.username,
                    id: newUser.id,
                    email: newUser.email,
                };

                const jwt = this.jwtService.sign(payload);
                return jwt;
            } else if (user) {
                const payload = {
                    username: user.username,
                    id: user.id,
                    email: user.email,
                };

                const jwt = this.jwtService.sign(payload);
                return jwt;
            }
        } catch (error) {
            console.log(error);
        }
    }

    googleRedirect(@Req() req, @Res() res) {
        if (req.user.jwt) {
            res.cookie('jwt', req.user.jwt);
            res.redirect('http://localhost:8081/home/');
        } else res.redirect('http://localhost:8081/login/');
    }
}
