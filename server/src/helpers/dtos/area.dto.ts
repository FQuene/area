import { IsNotEmpty, IsString, IsObject } from 'class-validator';

export class AreaDto {
    //

    @IsString()
    @IsNotEmpty()
    actionService: string;

    @IsString()
    @IsNotEmpty()
    actionDes: string;

    @IsString()
    @IsNotEmpty()
    actionId: string;

    @IsNotEmpty()
    actionParams;

    @IsNotEmpty()
    @IsString()
    reactionService: string;

    @IsString()
    @IsNotEmpty()
    reactionDes: string;

    @IsNotEmpty()
    @IsString()
    reactionId: string;

    @IsNotEmpty()
    reactionParams;
}
