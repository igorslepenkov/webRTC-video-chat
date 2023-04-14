import { Module } from '@nestjs/common';
import { MeetingsModule } from './meetings/meetings.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [MeetingsModule, DatabaseModule],
})
export class AppModule {}
