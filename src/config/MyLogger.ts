import { ConsoleLogger } from '@nestjs/common';
import {parseNumber} from "../utils/parsers/parseNumber";
import process from "process";
import {parseString} from "../utils/parsers/parseString";
import {AppEnv} from "../common/const/AppEnv";

export class MyLogger extends ConsoleLogger {
    /**
     * Write a 'log' level log.
     */
    log(message: any, ...optionalParams: any[]) {
        super.log(message,  ...optionalParams);
    }

    /**
     * Write an 'error' level log.
     */
    error(message: any, stack?: string | object, context?: string) {
        super.error(message, JSON.stringify(stack), context);
    }

    /**
     * Write a 'warn' level log.
     */
    warn(message: any, ...optionalParams: any[]) {
        super.log(message, optionalParams);
    }

    /**
     * Write a 'debug' level log.
     */
    debug(message: any, ...optionalParams: any[]) {
        super.log(message, optionalParams);
    }

    /**
     * Write a 'verbose' level log.
     */
    verbose(message: any, ...optionalParams: any[]) {
        super.log(message, optionalParams);
    }
}