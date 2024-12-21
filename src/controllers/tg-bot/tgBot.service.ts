import {forwardRef, Inject, Injectable, UploadedFile} from '@nestjs/common';
import { ICreateFileRes, ICreateFile } from './requests/createFile.request';
import {ICreateUserResponse, CreateUserBody} from './requests/createUser.request';
import { ICreateUserReqRes, ICreateUserReqReq } from './requests/createUserReq.request';

import { S3 } from 'providers/S3';
import {CheckRateLimitParams,  ICheckRateLimitRes} from "./requests/checkRateLimit.request";
import {JwtService} from "@nestjs/jwt";
import {PrismaService} from "../../providers/Prisma";
import {subHours} from "date-fns";
import {TelegramAPI} from "../../providers/Telegram";
import {PutObjectCommand } from "@aws-sdk/client-s3";
import {randomStringGenerator} from "@nestjs/common/utils/random-string-generator.util";

@Injectable()
export class TgBotService {
    constructor(
        @Inject(forwardRef(() => S3))
        private readonly s3: S3,
        private readonly jwtService: JwtService,
        private prisma: PrismaService,
        @Inject(forwardRef(() => TelegramAPI))
        private readonly telegramApi: TelegramAPI,
    ) {}

    async createFile(req:ICreateFile):Promise<ICreateFileRes> {
        const user = await this.prisma.user.findFirstOrThrow({
            where: {
                chat_id: +req.chat_id
            }
        });

        const fileInfo = await this.telegramApi.client.getFile(req.body.fileId)
        const stream = await this.telegramApi.client.getFileStream(req.body.fileId)

        const arr:Buffer[] =  []

        await new Promise(async (resolve) => {
            stream.on('data', chunk => {
                arr.push(chunk)
            });

            stream.on(('end'), () => {
                resolve({})
            })
        })

        const fileKey = randomStringGenerator() + '/' + fileInfo.file_path?.replace('documents/', '');
        await this.s3.client.send(new PutObjectCommand({
            Bucket: 'rag-search',
            Key: fileKey,
            Body: Buffer.concat(arr),
        }))

        const result = await this.prisma.file.create({
            data: {
                ownerId: user.id,
                name: req.body.name,
                mimeType: req.body.mimeType,
                content: req.body.content,
                fileSrc: 'https://storage.yandexcloud.net/rag-search/' + fileKey
            }
        });

        return {
            file: result
        };
    }

    async createUser(req:CreateUserBody):Promise<ICreateUserResponse> {
        const result = await this.prisma.user.create({
            data: {
                username: req.username,
                chat_id: req.chat_id,
                is_premium_tg: req.is_premium_tg,
                is_banned: false,
            }
        });

        return {
            user: result
        };
    }

    async createUserReq(req:ICreateUserReqReq):Promise<ICreateUserReqRes> {
        const user = await this.prisma.user.findFirstOrThrow({
            where: {
                chat_id: +req.chat_id
            }
        });

        const result = await this.prisma.request.create({
            data: {
                ownerId: user.id,
                requestText: req.body.requestText,
                responseText: req.body.responseText
            }
        });

        return {
            request: result
        };
    }

    async checkRateLimit(req:CheckRateLimitParams):Promise<ICheckRateLimitRes> {
        const user = await this.prisma.user.findFirst({
            where: {
                chat_id: +req.chatId
            },
            select: {
                is_banned: true,
                files: {
                    where: {
                        createdAt: {
                            gte: subHours(new Date(), 24)
                        }
                    },
                },
                requests: {
                    where: {
                        createdAt: {
                            gte: subHours(new Date(), 24)
                        }
                    },
                }
            }
        });

        if (!user) {
            return {
                available: true
            }
        }

        if (user.is_banned) {
            return {
                available: false,
                notAvailabilityReason: 'Это бан. Обратитесь к администратору для искупления вины'
            }
        }

        if (user.files.length > 50) {
            return {
                available: false,
                notAvailabilityReason: 'За текущие сутки вы отправили слишком много файлов'
            }
        }

        if (user.requests.length > 40) {
            return {
                available: false,
                notAvailabilityReason: 'За текущие сутки вы отправили слишком много запросов'
            }
        }

        return {
            available: true
        };
    }
}
