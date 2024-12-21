import {forwardRef, Inject, Injectable } from '@nestjs/common';

import { PrismaService } from "../../providers/Prisma";
import { IGetAVGReqPerUserRes } from "./requests/getAVGReqPerUser.request";
import {IDAUStats, IGetDAURes} from "./requests/getDAU.request";
import {IGetMAURes, IMauStats} from "./requests/getMAU.request";

@Injectable()
export class AnalyticsService {
    constructor(
        @Inject(forwardRef(() => PrismaService))
        private prisma: PrismaService
    ) {}

    async getDAU():Promise<IGetDAURes> {
        const dauResult = await this.prisma.$queryRaw`
         SELECT 
    date_trunc('day', src.ts) as "Date",
    count(distinct src.user_id) as "DAU",

    count(
        distinct
        case when date_trunc('day', src.ts) = date_trunc('day', src.first_ts) then src.user_id
        else null END
        ) as "NewDAU"
from(
    select 
        r."createdAt" as ts,
        r."ownerId" as user_id,
        min(r."createdAt") over (partition by r."ownerId") as first_ts
    from "Request" r
    where date_trunc('day', r."createdAt") >= date_trunc('day', NOW() - INTERVAL '7 day')
    ) src
group by 1
        `;

        (BigInt.prototype as any).toJSON = function () {
            return Number(this)
        };

        return {
            stats: dauResult as IDAUStats[],
        }
    }

    async getMAU():Promise<IGetMAURes> {
        const mauResult = await this.prisma.$queryRaw`
        SELECT 
    date_trunc('month', src.ts) as "Month",
    count(distinct src.user_id) as "MAU",

    count(
        distinct
        case when date_trunc('month', src.ts) = date_trunc('month', src.first_ts) then src.user_id
        else null END
        ) as "New MAU"
from(
    select 
        r."createdAt" as ts,
        r."ownerId" as user_id,
        min(r."createdAt") over (partition by r."ownerId") as first_ts
    from "Request" r
    ) src
group by 1
        `;

        (BigInt.prototype as any).toJSON = function () {
            return Number(this)
        };

        return {
            stats: mauResult as IMauStats[]
        }
    }

    async getAVGReqPerUser():Promise<IGetAVGReqPerUserRes> {
        const mauResult = await this.prisma.$queryRaw`
        SELECT 
    dt as "Date",
    avg(cnt_requests) as "Averege N of requests per User"
from(
    select 
        date_trunc('day', r."createdAt") as dt,
        r."ownerId" as user_id,
        count(*) as cnt_requests
    from "Request" r
    where date_trunc('day', r."createdAt") >= date_trunc('day', NOW() - INTERVAL '7 day')
    group by 1, 2
    ) src 
group by 1
        `;

        (BigInt.prototype as any).toJSON = function () {
            return Number(this)
        };

        return  {
            stats: mauResult,
        }
    }
}
