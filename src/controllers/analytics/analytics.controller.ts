import {
    ClassSerializerInterceptor,
    Controller,
    forwardRef,
    Inject,
    UseInterceptors,
} from '@nestjs/common';

import { AnalyticsService } from './analytics.service';
import { TransformInterceptor } from 'middlewares/response.interceptor';
import { S3 } from 'providers/S3';


@Controller('analytics')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(TransformInterceptor)
export class AnalyticsController {
    constructor(
        @Inject(forwardRef(() => AnalyticsService))
        private readonly tgBotService: AnalyticsService,
        @Inject(forwardRef(() => S3))
        private readonly s3: S3,
    ) {}
}
