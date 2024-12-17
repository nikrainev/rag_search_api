import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ScheduleModule } from '@nestjs/schedule';

import { JwtAuthGuard } from './middlewares/guards/jwt-auth.guard';
import { JwtStrategy } from './middlewares/guards/jwt.strategy';
import { TgBotModule } from './controllers/tg-bot/tgBot.module'
import { vars } from './config/vars';
import { MyLogger } from './config/MyLogger';
import {AdminModule} from "./controllers/admin/admin.module";
import {AnalyticsModule} from "./controllers/analytics/analytics.module";

@Global()
@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: vars.jwtSalt,
        }),
        TgBotModule,
        ScheduleModule.forRoot(),
        AdminModule,
        AnalyticsModule
    ],
    controllers: [],
    providers: [
        JwtModule,
        JwtAuthGuard,
        JwtStrategy,
        MyLogger,
    ],
    exports: [
        JwtModule,
        JwtAuthGuard,
        JwtStrategy,
        MyLogger,
    ],
})
export class AppModule {}
