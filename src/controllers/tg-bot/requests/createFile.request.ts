import {IsInt, IsOptional, IsString, Min} from 'class-validator';
import { Type } from 'class-transformer';
import { File as PrismaFile } from "@prisma/client";

export class CreateFileBody {
    @IsString()
    @Type(() => String)
    name: string;

    @IsString()
    @Type(() => String)
    mimeType: string;

    @IsString()
    @IsOptional()
    content?: string;

    @IsString()
    fileId: string
}

export class CreateFileParams {
    @IsInt()
    @Min(0)
    @Type(() => Number)
    chatId: number;
}

export interface ICreateFile {
    chat_id: number;
    body: CreateFileBody
}

export interface ICreateFileRes {
    file: PrismaFile
}
