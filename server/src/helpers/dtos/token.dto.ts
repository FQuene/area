import { IsNotEmpty, IsString } from 'class-validator';

export class TokenDto {
    //
    @IsString()
    @IsNotEmpty()
    service: string;

    @IsString()
    @IsNotEmpty()
    token: string;

    params: string;
}
