import { Module } from '@nestjs/common';
import { MessagesGateway } from './messages.gateway';
import { MeetingsModule } from 'src/meetings/meetings.module';

@Module({
  providers: [MessagesGateway],
  imports: [MeetingsModule],
})
export class MessagesModule {}
