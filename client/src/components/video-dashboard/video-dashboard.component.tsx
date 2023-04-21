import { ChangeEventHandler, useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Dialog,
  DialogContent,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  SxProps,
  Theme,
} from '@mui/material';

import SendIcon from '@mui/icons-material/Send';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { StyledVideoDashboard } from './style';
import { useToggle } from '../../hooks';
import { Video } from '../video/video.component';
import { messagesService } from '../../services';
import {
  ISendMessageToRoom,
  ServerEvents,
  useServerResponse,
} from '../../hooks/useServerResponse';
import { useParams } from 'react-router-dom';

export const VideoDashboard = () => {
  const displayStyles: SxProps<Theme> = (theme) => ({
    gridArea: 'display',
    display: 'grid',
    gridTemplateColumns: '8fr 3fr',
    columnGap: '10px',
    padding: '20px',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px',
    minWidth: 0,
    minHeight: 0,
  });

  const othersVideoStyles: SxProps<Theme> = (theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
    height: '100%',
    padding: '10px',
    backgroundColor: theme.palette.primary.light,
    borderRadius: '10px',
    minWidth: 0,
    minHeight: 0,
    overflow: 'auto',
  });

  const chatStyles: SxProps<Theme> = (theme) => ({
    gridArea: 'chat',
    padding: '10px',
    backgroundColor: theme.palette.primary.light,
    borderRadius: '10px',
  });

  const toolbaarStyles: SxProps<Theme> = (theme) => ({
    gridArea: 'toolbar',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: theme.palette.divider,
    borderRadius: '10px',
  });

  const chatInputStyles: SxProps<Theme> = (theme) => ({
    gridArea: 'chat-input',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });

  const messageStyles: SxProps<Theme> = (theme) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    color: theme.palette.primary.dark,
  });

  const { meeting_id: roomId } = useParams();
  const [message, setMessage] = useState<string>('');
  const [allMessages, setAllMessages] = useState<ISendMessageToRoom[]>([]);

  const newMessageFromServer = useServerResponse<ISendMessageToRoom>(
    ServerEvents.NewMessage,
  );

  const [isMicOn, toggleMic] = useToggle(false);
  const [isCamOn, toggleCam] = useToggle(false);
  const [myVideoStream, setMyVideoStream] = useState<MediaStream | null>(null);
  const [isDialogOpen, toggleDialog] = useToggle(false);

  const handleNewMessage = (message: ISendMessageToRoom) => {
    if (
      allMessages.find(
        (savedMessage) => message.messageBody === savedMessage.messageBody,
      )
    ) {
      return;
    }
    setAllMessages((state) => {
      const newState = state;
      newState.push(message);
      return newState;
    });
  };

  const members: { id: number }[] = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ];

  const startVideoStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setMyVideoStream(stream);
    } catch (err) {
      console.log(err);
    }
  };

  const stopVideoStream = async () => {
    try {
      if (myVideoStream) {
        const tracks = myVideoStream.getTracks();
        tracks.forEach((track) => track.stop());

        setMyVideoStream(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onMessageInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event && event.currentTarget.value) {
      setMessage(event.currentTarget.value);
    } else {
      setMessage('');
    }
  };

  const openDialog = () => {
    navigator.clipboard.writeText(window.location.href);
    toggleDialog();
    setTimeout(() => toggleDialog(), 700);
  };

  const sendMessage = () => {
    if (roomId) {
      messagesService.sendMessageToRoom(message, roomId);
    }
    setMessage('');
  };

  useEffect(() => {
    if (isCamOn) {
      startVideoStream();
    }

    if (!isCamOn) {
      stopVideoStream();
    }
  }, [isCamOn]);

  useEffect(() => {
    if (newMessageFromServer) {
      handleNewMessage(newMessageFromServer);
    }
  }, [newMessageFromServer]);

  return (
    <StyledVideoDashboard>
      <Paper sx={displayStyles} component="section">
        <Video videoStream={myVideoStream} />
        <Box sx={othersVideoStyles}>
          {members &&
            members.length > 0 &&
            members.map((member) => (
              <Video key={member.id} videoStream={myVideoStream} />
            ))}
        </Box>
      </Paper>
      <Box sx={chatStyles} component="section">
        {allMessages.map((message) => {
          return (
            <Box sx={messageStyles} key={message.messageBody}>
              <p>Client: {message.clientId}</p>
              <p>Client: {message.messageBody}</p>
            </Box>
          );
        })}
      </Box>
      <Box sx={toolbaarStyles} component="section">
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <IconButton onClick={toggleMic}>
            {isMicOn ? (
              <MicIcon fontSize="large" />
            ) : (
              <MicOffIcon color="error" fontSize="large" />
            )}
          </IconButton>
          <IconButton onClick={toggleCam}>
            {isCamOn ? (
              <VideocamIcon fontSize="large" />
            ) : (
              <VideocamOffIcon color="error" fontSize="large" />
            )}
          </IconButton>
        </Box>

        <IconButton onClick={openDialog}>
          <PersonAddIcon fontSize="large" />
        </IconButton>
      </Box>
      <Box sx={chatInputStyles} component="section">
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="message-input">Message</InputLabel>
          <OutlinedInput
            id="message-input"
            type="text"
            onChange={onMessageInput}
            value={message}
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end" onClick={sendMessage}>
                  <SendIcon fontSize="large" />
                </IconButton>
              </InputAdornment>
            }
            label="Message"
          />
        </FormControl>
      </Box>

      <Dialog
        open={isDialogOpen}
        onClose={toggleDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Alert
            sx={(theme) => ({
              backgroundColor: theme.palette.background.default,
            })}
            severity="success"
          >
            Invitation link has been copied to clipboard
          </Alert>
        </DialogContent>
      </Dialog>
    </StyledVideoDashboard>
  );
};
