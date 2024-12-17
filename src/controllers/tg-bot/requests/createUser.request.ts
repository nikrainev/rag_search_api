import { IsBoolean, IsInt, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import {User} from "@prisma/client";

export class CreateUserBody {
    @IsInt()
    @Min(0)
    @Type(() => Number)
    chat_id: number;

    @IsString()
    @Type(() => String)
    username: string;

    @IsBoolean()
    @Type(() => Boolean)
    is_premium_tg: boolean;
}

export interface ICreateUserResponse {
    user: User
}