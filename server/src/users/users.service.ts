import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UserDto, UserGoogleDto } from '../helpers/dtos/users.dto';
import { IResponse } from '../helpers/interfaces/IResponse';
import { AreaDto } from 'src/helpers/dtos/area.dto';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findAllUsers(): Promise<IResponse | undefined> {
        try {
            const users = await this.prisma.users.findMany({
                select: { username: true, email: true },
            });

            return {
                status: { code: HttpStatus.FOUND, message: 'found' },
                result: users,
            };
        } catch (error) {
            return {
                status: { code: HttpStatus.NOT_FOUND, message: 'not_found' },
            };
        }
    }

    async createUser(user: UserDto | UserGoogleDto): Promise<IResponse | undefined> {
        try {
            await this.prisma.users.create({
                data: {
                    accType: user.accType,
                    username: user.username,
                    email: user.email,
                    password: user.password,
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

            return {
                status: { code: HttpStatus.CREATED, message: 'created' },
            };
        } catch (error: Error | any) {
            console.log(error);
            let duplicateFields: string;
            error.message.includes('username') ? (duplicateFields = 'username') : undefined;
            error.message.includes('email') ? (duplicateFields = 'email') : undefined;

            return {
                status: {
                    code: HttpStatus.CONFLICT,
                    message: 'conflict',
                },
                duplicateFields: duplicateFields,
            };
        }
    }

    async findOneByUsername(username: string): Promise<Prisma.UsersCreateInput | undefined> {
        try {
            const user = await this.prisma.users.findUnique({
                where: {
                    username: username,
                },
            });
            return user;
        } catch (error) {
            return undefined;
        }
    }

    async findOneByEmail(email: string): Promise<Prisma.UsersCreateInput | undefined> {
        try {
            const user = await this.prisma.users.findUnique({
                where: {
                    email: email,
                },
            });
            return user;
        } catch (error) {
            return undefined;
        }
    }
    async createArea(id: number, area: AreaDto): Promise<Prisma.UsersCreateInput | undefined> {
        try {
            return this.prisma.users.update({
                where: { id: id },
                data: {
                    Areas: {
                        create: {
                            enabled: true,
                            actionService: area.actionService,
                            actionDes: area.actionDes,
                            actionId: area.actionId,
                            actionParams: area.actionParams,
                            reactionService: area.reactionService,
                            reactionDes: area.reactionDes,
                            reactionId: area.reactionId,
                            reactionParams: area.reactionParams,
                        },
                    },
                },
            });
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async getAreas(userId: number) {
        return this.prisma.areas.findMany({
            where: {
                parent: userId,
            },
        });
    }

    async deleteAreas(userId, areaId) {
        return this.prisma.areas.deleteMany({
            where: {
                parent: userId,
                id: areaId,
            },
        });
    }

    async addToken(userId: number, service: string, token: string, params): Promise<any> {
        return this.prisma.users.update({
            where: { id: userId },
            data: {
                Tokens: {
                    updateMany: {
                        where: {
                            parent: userId,
                            service: service,
                        },
                        data: {
                            token: token,
                            otherParams: params,
                            enabled: true,
                        },
                    },
                },
            },
        });
    }

    async getAllTokensStatus(userId) {
        return this.prisma.tokens.findMany({ where: { parent: userId } });
    }

    async getServiceToken(userId: number, service: string): Promise<any> {
        return this.prisma.tokens.findFirst({
            where: { parent: userId, service: service },
            select: { token: true, hasRefreshToken: true },
        });
    }

    async resetToken(id: number): Promise<any> {
        return await this.prisma.tokens.update({
            where: { id: id },
            data: { token: '', enabled: false, otherParams: {} },
        });
    }

    async controlAreaOnOff(id: number, status): Promise<any> {
        return await this.prisma.areas.update({ where: { id: id }, data: { enabled: status } });
    }
}
