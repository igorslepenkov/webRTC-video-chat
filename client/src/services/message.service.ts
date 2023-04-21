import { Socket, io } from 'socket.io-client';

enum ClientEvents {
  CreateRoomRequest = 'create-room',
  JoinRoomRequest = 'join-room',
  LeaveRoomRequest = 'leave-room',
  SendToRoomRequest = 'send-to-room',
}

export class MessagesService {
  private static _instance: MessagesService | null = null;

  BASE_WEBSOCKET_URL: string =
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_BACKEND_WEBSOCKET_SERVER_PROD!
      : process.env.REACT_APP_BACKEND_WEBSOCKET_SERVER_DEV!;

  public socket: Socket = io(this.BASE_WEBSOCKET_URL, {
    transports: ['websocket'],
  });

  private constructor() {}

  static get instance(): MessagesService {
    if (MessagesService._instance) {
      return MessagesService._instance;
    }

    MessagesService._instance = new MessagesService();
    return MessagesService._instance;
  }

  public async createRoom() {
    this.socket.emit(ClientEvents.CreateRoomRequest);
  }

  public async sendMessageToRoom(message: string, roomId: string) {
    this.socket.emit(ClientEvents.SendToRoomRequest, {
      body: {
        message,
        roomId,
      },
    });
  }
}

export const messagesService = MessagesService.instance;
