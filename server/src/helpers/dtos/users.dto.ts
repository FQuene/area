import { IsEmail, IsNotEmpty, IsString, IsByteLength, IsOptional } from 'class-validator';

export class UserDto {
    //
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsByteLength(4, 16)
    password: string;

    @IsNotEmpty()
    accType: string;
}

export class UserGoogleDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    accType: string;

    @IsOptional()
    password?: string;
}
