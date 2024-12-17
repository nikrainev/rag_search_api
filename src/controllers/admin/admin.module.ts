import {
    Module,
} from '@nestjs/common';

import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import {PrismaService} from "../../providers/Prisma";
import {TelegramAPI} from "../../providers/Telegram";

@Module({
    controllers: [AdminController],
    providers: [
        AdminService,
        TelegramAPI,
        PrismaService
    ],
    exports: [],
})

export class AdminModule {}
