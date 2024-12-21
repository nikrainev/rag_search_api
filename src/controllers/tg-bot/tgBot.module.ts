import {
    Module,
} from '@nestjs/common';

import { TgBotService } from './tgBot.service';
import { TgBotController } from './tgBot.controller';
import { S3 } from 'providers/S3';
import {JwtModule} from "@nestjs/jwt";
import {PrismaService} from "../../providers/Prisma";
import {TelegramAPI} from "../../providers/Telegram";

@Module({
    controllers: [TgBotController],
    providers: [
        TgBotService,
        S3,
        JwtModule,
        PrismaService,
        TelegramAPI
    ],
    exports: [],
})

export class TgBotModule {}
