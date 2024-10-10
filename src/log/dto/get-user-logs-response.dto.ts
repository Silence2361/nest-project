import { ApiProperty } from '@nestjs/swagger';
import { ILog, ILogResponse } from 'src/database/log.interface';

export class GetUserLogsResponseDto implements ILogResponse {
  @ApiProperty()
  docs: ILog[];

  @ApiProperty()
  count: number;
}