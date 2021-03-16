import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { AreaDto } from 'src/helpers/dtos/area.dto';
import { JwtAuthGuard } from 'src/auth/auth.guards';
import { TokenDto } from 'src/helpers/dtos/token.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('all')
    async all(@Res() res: Response) {
        this.usersService.findAllUsers().then((response) => {
            res.json(response);
        });
    }

    @UseGuards(JwtAuthGuard)
    @Post('create-area')
    async createArea(@Body() area: AreaDto, @Req() req, @Res() res: Response) {
        if (typeof area.actionParams == 'string') area.actionParams = JSON.parse(area.actionParams);
        if (typeof area.reactionParams == 'string')
            area.reactionParams = JSON.parse(area.reactionParams);

        this.usersService.createArea(req.user.id, area).then((response) => {
            if (response != undefined)
                res.json({
                    status: 'area has been created',
                    area: response,
                });
            else res.json(HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('areas')
    async getAreas(@Req() req, @Res() res: Response) {
        this.usersService.getAreas(req.user.id).then((response) => {
            res.json(response);
        });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete-area/:id')
    async deleteArea(@Param('id') id, @Req() req, @Res() res: Response) {
        this.usersService
            .deleteAreas(req.user.id, parseInt(id))
            .then(() => {
                res.json(HttpStatus.CREATED);
            })
            .catch((error) => {
                console.log(error);
                res.json(HttpStatus.CONFLICT);
            });
    }

    @UseGuards(JwtAuthGuard)
    @Post('add-token')
    async addToken(@Body() body: TokenDto, @Req() req, @Res() res: Response) {
        this.usersService
            .addToken(req.user.id, body.service, body.token, body.params)
            .then(() => {
                res.json(HttpStatus.CREATED);
            })
            .catch((error) => {
                console.log(error);
                res.json(HttpStatus.CONFLICT);
            });
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-tokens-status')
    async getToken(@Req() req, @Res() res: Response) {
        this.usersService
            .getAllTokensStatus(req.user.id)
            .then((response) => {
                res.json(response);
            })
            .catch((error) => {
                console.log(error);
                res.json(HttpStatus.CONFLICT);
            });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('reset-token/:id')
    async resetToken(@Param('id') id, @Res() res) {
        this.usersService
            .resetToken(parseInt(id))
            .then((response) => {
                res.json(response);
            })
            .catch((error) => {
                console.log(error);
                res.json(HttpStatus.CONFLICT);
            });
    }

    @UseGuards(JwtAuthGuard)
    @Post('area-on-off')
    async areaOnOff(@Req() req, @Body() body, @Res() res) {
        this.usersService.controlAreaOnOff(body.id, body.status).then((resp) => {
            res.json(200);
        });
    }
}
