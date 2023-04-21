import { Module } from '@nestjs/common';
import { MeetingsModule } from './meetings/meetings.module';
import { DatabaseModule } from './database/database.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [MeetingsModule, DatabaseModule, MessagesModule],
})
export class AppModule {}
