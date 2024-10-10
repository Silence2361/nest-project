import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import TelegramBot from 'node-telegram-bot-api';
import { firstValueFrom } from 'rxjs';
import { LogRepository } from 'src/database/log.repository';
import { WeatherData } from 'src/database/log.interface';

@Injectable()
export class WeatherBotService {
  private readonly bot: TelegramBot;
  private readonly weatherApiKey: string;

  constructor(
    private readonly logRepository: LogRepository,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const token: string = this.configService.get<string>('TELEGRAM_BOT_TOKEN');

    this.weatherApiKey = this.configService.get<string>('WEATHER_API_KEY');

    this.bot = new TelegramBot(token, { polling: true });

    this.initBot();
  }

  private initBot(): void {
    this.bot.onText(/\/weather (.+)/, async (msg, match) => {
      const chatId: number = msg.chat.id;

      const city: string = match ? match[1] : '';

      if (!city) {
        return this.bot.sendMessage(chatId, 'Please specify a city.');
      }

      try {
        const weatherData: WeatherData = await this.getWeather(city);

        const responseMessage: string = this.formatWeatherMessage(weatherData);

        this.bot.sendMessage(chatId, responseMessage);

        await this.logRepository.createLog({
          userId: msg.from.id,
          command: `/weather ${city}`,
          response: responseMessage,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        const errorMessage = 'City not found or an error occurred.';
        this.bot.sendMessage(chatId, errorMessage);

        await this.logRepository.createLog({
          userId: msg.from.id,
          command: `/weather ${city}`,
          response: errorMessage,
          timestamp: new Date().toISOString(),
        });
      }
    });
  }

  private async getWeather(city: string): Promise<WeatherData> {
    const url: string = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.weatherApiKey}&units=metric&lang=en`;

    const response: AxiosResponse<WeatherData> = await firstValueFrom(
      this.httpService.get<WeatherData>(url),
    );

    return response.data;
  }

  private formatWeatherMessage(data: WeatherData): string {
    return `Weather in ${data.name}: 
    Temperature: ${data.main.temp}°C, Feels like: ${data.main.feels_like}°C
    Description: ${data.weather[0].description}
    Humidity: ${data.main.humidity}%
    Wind speed: ${data.wind.speed} m/s`;
  }
}
