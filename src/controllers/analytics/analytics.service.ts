import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { S3 } from 'providers/S3';
import {PrismaService} from "../../providers/Prisma";

@Injectable()
export class AnalyticsService {
    constructor(
        @Inject(forwardRef(() => S3))
        private prisma: PrismaService
    ) {}
}
