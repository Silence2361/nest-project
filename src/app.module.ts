import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ObjectionModule } from 'nestjs-objection';
import { DatabaseModule } from './database/database.module';
import { LogModule } from './log/log.module';
import { WeatherBotModule } from './weather-bot/weather-bot.module';
import { AppConfigModule } from './third-party/config/config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    ObjectionModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          config: {
            client: 'pg',
            connection: {
              host: configService.get<string>('DATABASE_HOST'),
              port: configService.get<number>('DATABASE_PORT'),
              user: configService.get<string>('DATABASE_USER'),
              password: configService.get<string>('DATABASE_PASSWORD'),
              database: configService.get<string>('DATABASE_NAME'),
            },
          },
        };
      },
      inject: [ConfigService],
    }),
    LogModule,
    DatabaseModule,
    WeatherBotModule,
    AppConfigModule,
  ],
})
export class AppModule {}
