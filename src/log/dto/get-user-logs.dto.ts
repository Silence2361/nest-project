import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsDateString } from 'class-validator';

export class GetUserLogsDto {
  @ApiProperty({ description: 'User id', example: '123456' })
  @IsInt()
  userId: number;

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
