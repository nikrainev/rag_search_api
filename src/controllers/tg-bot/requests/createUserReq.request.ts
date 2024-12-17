import {IsInt, IsString, Min} from 'class-validator';
import { Type } from 'class-transformer';
import { Request } from "@prisma/client";

export class CreateUserReqBody {
    @IsString()
    @Type(() => String)
    requestText: string;

    @IsString()
    @Type(() => String)
    responseText: string;
}

export class CreateUserReqParams {
    @IsInt()
    @Min(0)
    @Type(() => Number)
    chatId: number;
}


export interface ICreateUserReqReq {
    chat_id: number;
    body: CreateUserReqBody
}

export interface ICreateUserReqRes {
    request: Request
}
