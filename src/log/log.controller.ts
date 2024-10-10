import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { LogService } from './log.service';
import { GetAllLogsDto } from 'src/log/dto/get-all-logs.dto';
import { GetUserLogsDto } from 'src/log/dto/get-user-logs.dto';
import { GetAllLogsResponseDto } from './dto/get-all-logs-response.dto';
import { GetUserLogsResponseDto } from './dto/get-user-logs-response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('logs')
@Controller('logs')
export class LogsController {
  constructor(private readonly logService: LogService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all logs' })
  @ApiResponse({ status: 200, description: 'Get list of all logs.' })
  async getAllLogs(
    @Query() pagination: GetAllLogsDto,
  ): Promise<GetAllLogsResponseDto> {
    return this.logService.getAllLogs(pagination);
  }

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get logs by userId' })
  @ApiResponse({ status: 200, description: 'Get logs of user' })
  async getUserLogs(
    @Param('userId') userId: number,
    @Query() pagination: GetUserLogsDto,
  ): Promise<GetUserLogsResponseDto> {
    return this.logService.getUserLogs(userId, pagination);
  }
}
