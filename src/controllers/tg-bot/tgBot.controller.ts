import {
    ClassSerializerInterceptor,
    Controller,
    forwardRef,
    Inject,
    Get,
    UseInterceptors, UseGuards, Put, Post, Req, Param, Body, UploadedFile
} from '@nestjs/common';

import { TgBotService } from './tgBot.service';
import { TransformInterceptor } from 'middlewares/response.interceptor';
import {CreateFileBody, CreateFileParams, ICreateFileRes} from './requests/createFile.request';
import {ICreateUserResponse, CreateUserBody} from './requests/createUser.request';
import {CreateUserReqBody, CreateUserReqParams, ICreateUserReqRes} from './requests/createUserReq.request';
import { S3 } from 'providers/S3';
import {CheckRateLimitParams, ICheckRateLimitRes} from "./requests/checkRateLimit.request";
import {Roles} from "../../decorators/role.decorator";
import {JwtAuthGuard} from "../../middlewares/guards/jwt-auth.guard";
import {UserRoles} from "../../common/const/user/USER_ROLES";
import {IRequest} from "../../common/types/fastify.types";
import {SaveFileDataParams} from "./requests/saveFileData.request";
import {FileInterceptor} from "@nestjs/platform-express";


@Controller('tg-bot')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(TransformInterceptor)
export class TgBotController {
    constructor(
        @Inject(forwardRef(() => TgBotService))
        private readonly tgBotService: TgBotService,
        @Inject(forwardRef(() => S3))
        private readonly s3: S3,
    ) {}

    @Roles(UserRoles.TgBot)
    @UseGuards(JwtAuthGuard)
    @Post('/user')
    async createUser(
        @Req() req:IRequest,
        @Body() body:CreateUserBody,
    ):Promise<ICreateUserResponse> {
        return this.tgBotService.createUser(body);
    }

    @Roles(UserRoles.TgBot)
    @UseGuards(JwtAuthGuard)
    @Post('/user/:chatId/file')
    async createFile(
        @Req() req:IRequest,
        @Body() body:CreateFileBody,
        @Param() params:CreateFileParams,
    ):Promise<ICreateFileRes> {
        return this.tgBotService.createFile({
            chat_id: params.chatId,
            body,
        });
    }

    @Roles(UserRoles.TgBot)
    @UseGuards(JwtAuthGuard)
    @Post('/user/:chatId/user-request')
    async createUserReq(
        @Req() req:IRequest,
        @Body() body:CreateUserReqBody,
        @Param() params:CreateUserReqParams,
    ):Promise<ICreateUserReqRes> {
        return this.tgBotService.createUserReq({
            chat_id: params.chatId,
            body,
        });
    }

    @Roles(UserRoles.TgBot)
    @UseGuards(JwtAuthGuard)
    @Get('/user/:chatId/rate-limit')
    async checkRateLimit(
        @Param() params:CheckRateLimitParams,
    ):Promise<ICheckRateLimitRes> {
        return this.tgBotService.checkRateLimit(params);
    }
}
