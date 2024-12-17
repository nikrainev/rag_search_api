import {IsInt, IsString, Min} from 'class-validator';
import { Type } from 'class-transformer';
import { Request } from "@prisma/client";

export class SendMessageToUsersBody {
    @IsString()
    @Type(() => String)
    messageText: string;
}

export interface ISendMessageToUsersRes {
    sendToCount: number,
}
