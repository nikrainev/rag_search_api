import {IsInt, Min} from "class-validator";
import {Type} from "class-transformer";

export class CheckRateLimitParams {
    @IsInt()
    @Min(0)
    @Type(() => Number)
    chatId: number;
}
export interface ICheckRateLimitRes {
    available: boolean,
    notAvailabilityReason?: string
}
