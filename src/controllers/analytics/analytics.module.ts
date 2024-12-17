import {
    Module,
} from '@nestjs/common';

import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { S3 } from 'providers/S3';
import {JwtModule} from "@nestjs/jwt";
import {PrismaService} from "../../providers/Prisma";

@Module({
    controllers: [AnalyticsController],
    providers: [
        AnalyticsService,
        S3,
        JwtModule,
        PrismaService
    ],
    exports: [],
})

export class AnalyticsModule {}
