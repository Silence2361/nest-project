import { BadRequestException, Injectable } from '@nestjs/common';
import { ILogResponse, IPagination } from 'src/database/log.interface';
import { LogRepository } from 'src/database/log.repository';

@Injectable()
export class LogService {
  constructor(private readonly logRepository: LogRepository) {}

  async getAllLogs(pagination: IPagination): Promise<ILogResponse> {
    const { page = 1, pageSize = 10, startDate, endDate } = pagination;

    const offset = (page - 1) * pageSize;

    if (startDate && isNaN(Date.parse(String(startDate)))) {
      throw new BadRequestException('Invalid start date format.');
    }
    if (endDate && isNaN(Date.parse(String(endDate)))) {
      throw new BadRequestException('Invalid end date format.');
    }

    let logs = await this.logRepository.getAllLogs({
      offset,
      limit: pageSize,
    });

    if (startDate) {
      logs = logs.filter(
        (log) => new Date(log.timestamp) >= new Date(startDate),
      );
    }
    if (endDate) {
      logs = logs.filter((log) => new Date(log.timestamp) <= new Date(endDate));
    }

    const paginatedLogs = logs.slice(offset, offset + pageSize);

    const count = await this.logRepository.countLogs();

    return {
      docs: paginatedLogs.map(
        ({ id, userId, command, response, timestamp }) => ({
          id,
          userId,
          command,
          response,
          timestamp,
        }),
      ),
      count,
    };
  }

  async getUserLogs(
    userId: number,
    pagination: IPagination,
  ): Promise<ILogResponse> {
    const { page = 1, pageSize = 10, startDate, endDate } = pagination;

    const offset = (page - 1) * pageSize;

    if (startDate && isNaN(Date.parse(String(startDate)))) {
      throw new BadRequestException('Invalid start date format.');
    }
    if (endDate && isNaN(Date.parse(String(endDate)))) {
      throw new BadRequestException('Invalid end date format.');
    }

    let logs = await this.logRepository.getAllLogs({
      offset,
      limit: pageSize,
    });

    logs = logs.filter((log) => log.userId === userId);

    if (startDate) {
      logs = logs.filter(
        (log) => new Date(log.timestamp) >= new Date(startDate),
      );
    }
    if (endDate) {
      logs = logs.filter((log) => new Date(log.timestamp) <= new Date(endDate));
    }

    const paginatedLogs = logs.slice(offset, offset + pageSize);

    const count = await this.logRepository.countLogs();

    return {
      docs: paginatedLogs.map(
        ({ id, userId, command, response, timestamp }) => ({
          id,
          userId,
          command,
          response,
          timestamp,
        }),
      ),
      count,
    };
  }
}
