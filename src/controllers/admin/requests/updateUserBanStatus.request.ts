import {IsBoolean, IsInt, Min} from 'class-validator';
import { Type } from 'class-transformer';
import { User} from "@prisma/client";

export class UpdateUserBanStatusParams {
    @IsInt()
    @Min(0)
    @Type(() => Number)
    chatId: number;
}

export class UpdateUserBanStatusBody {
    @IsBoolean()
    @Type(() => Boolean)
    isBan: boolean;
}

export interface IUpdateUserBanStatus {
    params: UpdateUserBanStatusParams,
    body: UpdateUserBanStatusBody
}

export interface IUpdateUserBanStatusRes {
    user: User
}
