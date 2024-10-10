export interface ILog {
  id: number;
  userId: number;
  command: string;
  response: string;
  timestamp: string;
}

export interface ICreateLog {
  userId: number;
  command: string;
  response: string;
  timestamp: string;
}

export interface IPagination {
  page?: number;
  pageSize?: number;
  startDate?: string;
  endDate?: string;
}

export interface ICountLogs {
  count: string;
}

export interface ILogResponse {
  docs: ILog[];
  count: number;
}

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: { description: string }[];
  wind: { speed: number };
}
