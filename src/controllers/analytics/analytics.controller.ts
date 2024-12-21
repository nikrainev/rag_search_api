import {
    ClassSerializerInterceptor,
    Controller,
    forwardRef,
    Inject,
    UseInterceptors,
    Get,
} from '@nestjs/common';

import { AnalyticsService } from './analytics.service';
import { TransformInterceptor } from 'middlewares/response.interceptor';
import { IGetMAURes } from "./requests/getMAU.request";
import { IGetDAURes } from "./requests/getDAU.request";
import { IGetAVGReqPerUserRes } from "./requests/getAVGReqPerUser.request";


@Controller('analytics')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(TransformInterceptor)
export class AnalyticsController {
    constructor(
        @Inject(forwardRef(() => AnalyticsService))
        private readonly analyticsService: AnalyticsService
    ) {}

    @Get('/mau')
    async getMau():Promise<IGetMAURes> {
        return this.analyticsService.getMAU()
    }

    @Get('/dau')
    async getDAU():Promise<IGetDAURes> {
        return this.analyticsService.getDAU()
    }

    @Get('/avg-req-per-user')
    async getAVGReqPerUser():Promise<IGetAVGReqPerUserRes> {
        return this.analyticsService.getAVGReqPerUser()
    }
}
