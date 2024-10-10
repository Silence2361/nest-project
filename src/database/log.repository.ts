import { InjectModel } from 'nestjs-objection';
import { ModelClass } from 'objection';
import { Log } from './log.model';
import { ICountLogs, ICreateLog, ILog } from './log.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LogRepository {
  constructor(@InjectModel(Log) private readonly logModel: ModelClass<Log>) {}

  async createLog(createLog: ICreateLog): Promise<ILog> {
    return this.logModel
      .query()
      .insert({ ...createLog, timestamp: new Date().toISOString() });
  }

  async getAllLogs(paginationOptions: {
    offset: number;
    limit: number;
  }): Promise<ILog[]> {
    return this.logModel
      .query()
      .orderBy('timestamp', 'desc')
      .offset(paginationOptions.offset)
      .limit(paginationOptions.limit);
  }

  async getUserLogs(userId: number): Promise<ILog[]> {
    return this.logModel
      .query()
      .where('userId', userId)
      .orderBy('timestamp', 'desc');
  }

  async countLogs(): Promise<number> {
    const result = await this.logModel
      .query()
      .count('id as count')
      .castTo<ICountLogs[]>();
    return parseInt(result[0].count, 10);
  }
}
