import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { config } from 'dotenv';

config();
@Injectable()
export class InstagramAppService {
    constructor(private readonly prisma: PrismaService) {}

    async actionWinFollowers(params, areaId) {
        let firstCall = 0;
        let secondCall = 0;

        if (areaId == undefined) return;

        if (params['2'] == undefined) {
            await axios
                .get('https://instagram-data1.p.rapidapi.com/followers', {
                    params: { username: params['1'] },
                    headers: {
                        'x-rapidapi-key': process.env.INSTAGRAM_API,
                        'x-rapidapi-host': 'instagram-data1.p.rapidapi.com',
                    },
                })
                .then((response) => (firstCall = response.data.count))
                .catch((error) => {
                    console.log(error);
                    return false;
                });
            const newParams = {
                '1': params['1'],
                '2': firstCall,
            };
            await this.prisma.areas.update({
                where: { id: areaId },
                data: { actionParams: newParams, lastTrigger: null },
            });
            return false;
        } else {
            await axios
                .get('https://instagram-data1.p.rapidapi.com/followers', {
                    params: { username: params['1'] },
                    headers: {
                        'x-rapidapi-key': process.env.INSTAGRAM_API,
                        'x-rapidapi-host': 'instagram-data1.p.rapidapi.com',
                    },
                })
                .then((response) => (secondCall = response.data.count))
                .catch((error) => {
                    console.log(error);
                    return false;
                });
            const newParams = {
                '1': params['1'],
                '2': secondCall,
            };

            if (secondCall > params['2']) {
                await this.prisma.areas.update({
                    where: { id: areaId },
                    data: { actionParams: newParams, lastTrigger: null, enabled: false },
                });
                return true;
            }
        }
    }

    async actionLoseFollowers(params, areaId) {
        let firstCall = 0;
        let secondCall = 0;

        if (areaId == undefined) return;

        if (params['2'] == undefined) {
            await axios
                .get('https://instagram-data1.p.rapidapi.com/followers', {
                    params: { username: params['1'] },
                    headers: {
                        'x-rapidapi-key': process.env.INSTAGRAM_API,
                        'x-rapidapi-host': 'instagram-data1.p.rapidapi.com',
                    },
                })
                .then((response) => (firstCall = response.data.count))
                .catch((error) => {
                    console.log(error);
                    return false;
                });
            const newParams = {
                '1': params['1'],
                '2': firstCall,
            };
            await this.prisma.areas.update({
                where: { id: areaId },
                data: { actionParams: newParams, lastTrigger: null },
            });

            return false;
        } else {
            await axios
                .get('https://instagram-data1.p.rapidapi.com/followers', {
                    params: { username: params['1'] },
                    headers: {
                        'x-rapidapi-key': process.env.INSTAGRAM_API,
                        'x-rapidapi-host': 'instagram-data1.p.rapidapi.com',
                    },
                })
                .then((response) => (secondCall = response.data.count))
                .catch((error) => {
                    console.log(error);
                    return false;
                });
            const newParams = {
                '1': params['1'],
                '2': secondCall,
            };

            if (secondCall < params['2']) {
                await this.prisma.areas.update({
                    where: { id: areaId },
                    data: { actionParams: newParams, lastTrigger: null, enabled: false },
                });

                return true;
            }
        }
    }

    async actionWinFollowings(params, areaId) {
        let firstCall = 0;
        let secondCall = 0;

        if (areaId == undefined) return;

        if (params['2'] == undefined) {
            await axios
                .get('https://instagram-data1.p.rapidapi.com/followings', {
                    params: { username: params['1'] },
                    headers: {
                        'x-rapidapi-key': process.env.INSTAGRAM_API,
                        'x-rapidapi-host': 'instagram-data1.p.rapidapi.com',
                    },
                })
                .then((response) => (firstCall = response.data.count))
                .catch((error) => {
                    console.log(error);
                    return false;
                });
            const newParams = {
                '1': params['1'],
                '2': firstCall,
            };
            await this.prisma.areas.update({
                where: { id: areaId },
                data: { actionParams: newParams, lastTrigger: null },
            });
            return false;
        } else {
            await axios
                .get('https://instagram-data1.p.rapidapi.com/followings', {
                    params: { username: params['1'] },
                    headers: {
                        'x-rapidapi-key': process.env.INSTAGRAM_API,
                        'x-rapidapi-host': 'instagram-data1.p.rapidapi.com',
                    },
                })
                .then((response) => (secondCall = response.data.count))
                .catch((error) => {
                    console.log(error);
                    return false;
                });
            const newParams = {
                '1': params['1'],
                '2': secondCall,
            };

            if (secondCall > params['2']) {
                await this.prisma.areas.update({
                    where: { id: areaId },
                    data: { actionParams: newParams, lastTrigger: null, enabled: false },
                });
                return true;
            }
            return false;
        }
    }

    async actionLoseFollowings(params, areaId) {
        let firstCall = 0;
        let secondCall = 0;

        if (areaId == undefined) return;

        if (params['2'] == undefined) {
            await axios
                .get('https://instagram-data1.p.rapidapi.com/followings', {
                    params: { username: params['1'] },
                    headers: {
                        'x-rapidapi-key': process.env.INSTAGRAM_API,
                        'x-rapidapi-host': 'instagram-data1.p.rapidapi.com',
                    },
                })
                .then((response) => (firstCall = response.data.count))
                .catch((error) => {
                    console.log(error);
                    return false;
                });
            const newParams = {
                '1': params['1'],
                '2': firstCall,
            };
            await this.prisma.areas.update({
                where: { id: areaId },
                data: { actionParams: newParams, lastTrigger: null },
            });
            return false;
        } else {
            await axios
                .get('https://instagram-data1.p.rapidapi.com/followings', {
                    params: { username: params['1'] },
                    headers: {
                        'x-rapidapi-key': process.env.INSTAGRAM_API,
                        'x-rapidapi-host': 'instagram-data1.p.rapidapi.com',
                    },
                })
                .then((response) => (secondCall = response.data.count))
                .catch((error) => {
                    console.log(error);
                    return false;
                });
            const newParams = {
                '1': params['1'],
                '2': secondCall,
            };

            if (secondCall < params['2']) {
                await this.prisma.areas.update({
                    where: { id: areaId },
                    data: { actionParams: newParams, lastTrigger: null, enabled: false },
                });
                return true;
            }
            return false;
        }
    }
}
