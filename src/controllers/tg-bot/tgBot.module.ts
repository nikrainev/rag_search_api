import {
    Module,
} from '@nestjs/common';

import { TgBotService } from './tgBot.service';
import { TgBotController } from './tgBot.controller';
import { S3 } from 'providers/S3';
import {JwtModule} from "@nestjs/jwt";
import {PrismaService} from "../../providers/Prisma";

@Module({
    controllers: [TgBotController],
    providers: [
        TgBotService,
        S3,
        JwtModule,
        PrismaService
    ],
    exports: [],
})

export class TgBotModule {}
