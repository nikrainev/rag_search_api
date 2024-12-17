import { NotFoundException } from '@nestjs/common';
import { AuthCodes } from '../errorsCodes/Auth.errorCodes';

export class AuthCacheNotFoundError extends NotFoundException {
    constructor() {
        super([AuthCodes.authCacheNotFound]);
    }
}

export class UserNotFoundError extends NotFoundException {
    constructor() {
        super([AuthCodes.userNotFound]);
    }
}
