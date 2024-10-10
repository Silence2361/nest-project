import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { HttpModule } from '@nestjs/axios';
import { LogsController } from './log.controller';
import { LogService } from './log.service';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [LogsController],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
