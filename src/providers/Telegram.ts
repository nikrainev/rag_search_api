import { Injectable } from '@nestjs/common';

import { vars } from '../config/vars';
import TelegramBot = require("node-telegram-bot-api")

@Injectable()
export class TelegramAPI {
    public client: TelegramBot;
    constructor() {
        console.log(TelegramBot)
        this.client = new TelegramBot(vars.tgToken, {
            polling: false
        });
    }
}
