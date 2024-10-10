import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        WEATHER_API_KEY: Joi.string().required(),
        TELEGRAM_BOT_TOKEN: Joi.string().required(),
      }),
    }),
  ],
})
export class AppConfigModule {}
