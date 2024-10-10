import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, Min } from 'class-validator';

export class GetAllLogsDto {
  @ApiPropertyOptional({ description: 'Pages number', default: 1 })
  @IsOptional()
  @IsInt()
  @Min(0)
  page: number;

  @ApiPropertyOptional({ description: 'Quantity of logs', default: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  pageSize: number;

  @ApiPropertyOptional({
    description: 'Start date of ISO filtration',
    example: '2024-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  startDate: string;

  @ApiPropertyOptional({
    description: 'End date of ISO filtration',
    example: '2024-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  endDate: string;
}
