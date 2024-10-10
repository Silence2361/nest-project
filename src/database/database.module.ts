import { Global, Module } from '@nestjs/common';
import { ObjectionModule } from 'nestjs-objection';
import { LogRepository } from './log.repository';
import { Log } from './log.model';

@Global()
@Module({
  imports: [ObjectionModule.forFeature([Log])],
  providers: [LogRepository],
  exports: [LogRepository],
})
export class DatabaseModule {}
