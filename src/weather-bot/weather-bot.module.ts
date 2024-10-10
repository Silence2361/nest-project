import { Module } from '@nestjs/common';
import { WeatherBotService } from './weather-bot.service';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [HttpModule, DatabaseModule],
  providers: [WeatherBotService],
})
export class WeatherBotModule {}
