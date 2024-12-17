import 'dotenv/config';
import { parseNumber } from '../utils/parsers/parseNumber';
import { parseString } from '../utils/parsers/parseString';
import * as process from 'process';
import { AppEnv } from '../common/const/AppEnv';

export const vars = Object.freeze({
    port: parseNumber(process.env.PORT, 3001),
    appEnv: parseString(process.env.APP_ENV, AppEnv.Local),
    jwtSalt: parseString(process.env.JWT_SALT, ''),
    postgres: {
        url: parseString(process.env.APP_ENV, '')
    },
    s3: {
        accessKey: parseString(process.env.S3_ACCESS_KEY_ID, ''),
        secretKey: parseString(process.env.S3_SECRET_ACCESS_KEY, ''),
        recordingsBucketName: parseString(process.env.S3_RECORDINGS_BUCKET_NAME, ''),
        region: parseString(process.env.S3_REGION, ''),
        endpoint: parseString(process.env.S3_ENDPOINT, ''),
    },
    tgToken: parseString(process.env.TG_BOT_TOKEN, '')
});
