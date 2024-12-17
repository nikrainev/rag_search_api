import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../providers/Prisma";
import {IGetUsersRes} from "./requests/getUsers.request";
import {ISendMessageToUsersRes, SendMessageToUsersBody} from "./requests/sendMessageToUsers.request";
import {
    IUpdateUserBanStatus,
    IUpdateUserBanStatusRes,
    UpdateUserBanStatusParams
} from "./requests/updateUserBanStatus.request";
import {UserNotFoundError} from "../../common/errors/Auth.errors";

@Injectable()
export class AdminService {
    constructor(
        private prisma: PrismaService
    ) {}

    async getUsers():Promise<IGetUsersRes> {
        const users = await this.prisma.user.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        });

        return {
            users,
        };
    }

    async sendMessageToUsers(req:SendMessageToUsersBody):Promise<ISendMessageToUsersRes> {
        const users = await this.prisma.user.findMany({
            orderBy: {
                createdAt: 'asc'
            },
            select: {
                chat_id: true,
            }
        });

        return {
            sendToCount: users.length
        };
    }

    async updateUserBanStatus(req:IUpdateUserBanStatus):Promise<IUpdateUserBanStatusRes> {
        let user

        try {
             user = await this.prisma.user.update({
                where: {
                    chat_id: +req.params.chatId,
                },
                data: {
                    is_banned: req.body.isBan
                }
            });
        } catch (e) {
            throw new UserNotFoundError()
        }

        return {
            user: user
        };
    }
}
