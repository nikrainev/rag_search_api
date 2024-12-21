import {IsInt, Min} from 'class-validator';
import { Type } from 'class-transformer';
import { File as PrismaFile } from "@prisma/client";

export class SaveFileDataParams {
    @IsInt()
    @Min(0)
    @Type(() => Number)
    fileId: number;
}

export interface ICreateFileRes {
    file: PrismaFile
}
