import { useEffect, useState } from 'react';
import { messagesService } from '../services';

export enum ServerEvents {
  RoomCreated = 'room-created',
  NewUserJoined = 'new-user-join',
  UserHasLeft = 'user-leave',
  NewMessage = 'new-message',
}

export interface IServerMessage {
  message: string;
}

export interface ICreateRoom {
  roomId: string;
}

export interface ISendMessageToRoom {
  messageBody: string;
  clientId: string;
}

type AdditionalResponseBody = ICreateRoom | ISendMessageToRoom | undefined;

type IServerResponse<T extends AdditionalResponseBody = undefined> =
  IServerMessage & T;

export const useServerResponse = <T extends AdditionalResponseBody>(
  typeOfEvent: ServerEvents,
): IServerResponse<T> | null => {
  const [serverMessage, setServerMessage] = useState<IServerResponse<T> | null>(
    null,
  );

  useEffect(() => {
    const socket = messagesService.socket;

    socket.on(typeOfEvent, (data: IServerResponse<T>) => {
      setServerMessage(data);
    });

    return () => {
      socket.removeListener(typeOfEvent);
    };
  }, []);

  return serverMessage;
};
