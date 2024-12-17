import {
    ClassSerializerInterceptor,
    Controller,
    forwardRef,
    Inject,
    Get,
    UseInterceptors, UseGuards,
    Post,
    Param,
    Body,
    Put
} from '@nestjs/common';

import { AdminService } from './admin.service';
import { TransformInterceptor } from 'middlewares/response.interceptor';
import {Roles} from "../../decorators/role.decorator";
import {JwtAuthGuard} from "../../middlewares/guards/jwt-auth.guard";
import {UserRoles} from "../../common/const/user/USER_ROLES";
import {
    IUpdateUserBanStatusRes,
    UpdateUserBanStatusBody,
    UpdateUserBanStatusParams
} from "./requests/updateUserBanStatus.request";
import {ISendMessageToUsersRes, SendMessageToUsersBody} from "./requests/sendMessageToUsers.request";
import {IGetUsersRes} from "./requests/getUsers.request";


@Controller('admin')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(TransformInterceptor)
export class AdminController {
    constructor(
        @Inject(forwardRef(() => AdminService))
        private readonly adminService: AdminService,
    ) {}

    @Roles(UserRoles.Admin)
    @UseGuards(JwtAuthGuard)
    @Get('/users')
    async getUsers():Promise<IGetUsersRes> {
        return this.adminService.getUsers();
    }

    @Roles(UserRoles.Admin)
    @UseGuards(JwtAuthGuard)
    @Post('/users/message')
    async sendMessageToUsers(
        @Body() body:SendMessageToUsersBody
    ):Promise<ISendMessageToUsersRes> {
        return this.adminService.sendMessageToUsers(body)
    }

    @Roles(UserRoles.Admin)
    @UseGuards(JwtAuthGuard)
    @Put('/user/:chatId/ban-status')
    async updateUserBanStatus(
        @Body() body:UpdateUserBanStatusBody,
        @Param() params:UpdateUserBanStatusParams,
    ):Promise<IUpdateUserBanStatusRes> {
        return this.adminService.updateUserBanStatus({
            params,
            body
        });
    }
}
