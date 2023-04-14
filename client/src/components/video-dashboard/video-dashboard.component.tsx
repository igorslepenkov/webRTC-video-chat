import { ChangeEventHandler, useState } from 'react';
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

  const videoStyles: SxProps<Theme> = (theme) => ({
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.primary.contrastText,
    borderRadius: '20px',
    minWidth: 0,
    minHeight: '20%',
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

  const [message, setMessage] = useState<string>('');
  const [isMicOn, toggleMic] = useToggle(false);
  const [isCamOn, toggleCam] = useToggle(false);
  const [isDialogOpen, toggleDialog] = useToggle(false);

  const members = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];

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
    console.log(message);
    setMessage('');
  };

  return (
    <StyledVideoDashboard>
      <Paper sx={displayStyles} component="section">
        <Box component="video" sx={videoStyles}></Box>
        <Box sx={othersVideoStyles}>
          {members.map((member) => (
            <Box sx={videoStyles} key={member.id}></Box>
          ))}
        </Box>
      </Paper>
      <Box sx={chatStyles} component="section">
        Chat
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
