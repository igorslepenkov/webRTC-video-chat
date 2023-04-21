import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MeetingsService } from 'src/meetings';
import { handleServiceErrors } from 'src/utils';

enum ClientEvents {
  CreateRoomRequest = 'create-room',
  JoinRoomRequest = 'join-room',
  LeaveRoomRequest = 'leave-room',
  SendToRoomRequest = 'send-to-room',
}

enum ServerEvents {
  RoomCreated = 'room-created',
  NewUserJoined = 'new-user-join',
  UserHasLeft = 'user-leave',
  NewMessage = 'new-message',
}

@WebSocketGateway(Number(process.env.MESSAGES_WEBSOCKET_PORT ?? 3005), {
  transports: ['websocket'],
  cors: {
    origin:
      process.env.NODE_ENV === 'production'
        ? process.env.CLIENT_URL_PROD
        : process.env.CLIENT_URL_DEV,
  },
})
export class MessagesGateway {
  rooms: { [key: string]: Socket[] } = {};
  constructor(private meetingsService: MeetingsService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage(ClientEvents.CreateRoomRequest)
  async handleCreateRoomMessage(
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    try {
      const meeting = await this.meetingsService.create(client.id);
      if (meeting) {
        const roomId = `room-${meeting.id}`;
        this.rooms[roomId] = [client];
        await client.join(roomId);

        this.server.to(roomId).emit(ServerEvents.RoomCreated, {
          message: 'Room created',
          roomId,
        });
      }
    } catch (err) {
      handleServiceErrors(err);
    }
  }

  @SubscribeMessage(ClientEvents.JoinRoomRequest)
  async handleJoinMessage(
    @MessageBody('roomId') roomId: string,
    @ConnectedSocket() client: Socket,
  ): Promise<boolean | string> {
    try {
      if (!this.rooms[roomId]) return 'Room with provided id not found';

      await client.join(roomId);
      this.rooms[roomId].push(client);

      this.server.to(roomId).emit(ServerEvents.NewUserJoined, {
        message: `New user with client id ${client.id} has joined the room with link`,
      });

      return true;
    } catch (err) {
      handleServiceErrors(err);
    }
  }

  @SubscribeMessage(ClientEvents.LeaveRoomRequest)
  async handleLeaveMessage(
    @MessageBody('roomId') roomId: string,
    @ConnectedSocket() client: Socket,
  ): Promise<boolean | string> {
    try {
      if (!this.rooms[roomId]) return 'Room with provided id not found';

      await client.leave(roomId);
      this.rooms[roomId] = this.rooms[roomId].filter(
        (socket: Socket) => socket.id === client.id,
      );
      this.server.to(roomId).emit(ServerEvents.UserHasLeft, {
        message: `User with client id ${client.id} has left the room`,
      });

      return true;
    } catch (err) {
      handleServiceErrors(err);
    }
  }

  @SubscribeMessage(ClientEvents.SendToRoomRequest)
  async handleSendToRoomMessage(
    @MessageBody('body')
    { roomId: roomId, message }: { roomId: string; message: string },
    @ConnectedSocket() client: Socket,
  ): Promise<boolean | string> {
    try {
      if (!this.rooms[roomId]) return 'Room with provided id not found';

      this.server.to(roomId).emit(ServerEvents.NewMessage, {
        message: `New mesage from user ${client.id}`,
        messageBody: message,
        clientId: client.id,
      });

      return true;
    } catch (err) {
      handleServiceErrors(err);
    }
  }
}
