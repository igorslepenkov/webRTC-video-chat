import { Navigate } from 'react-router-dom';

import { Box, Button, Paper, SxProps, Theme } from '@mui/material';
import { Page } from '../../components';
import { ROUTE } from '../../router';
import { createDinamicUrlString } from '../../utils';
import { ICreateRoom, useServerResponse } from '../../hooks/useServerResponse';
import { ServerEvents } from '../../hooks/useServerResponse';
import { messagesService } from '../../services';

export const Home = () => {
  const createRoomResponse = useServerResponse<ICreateRoom>(
    ServerEvents.RoomCreated,
  );
  const startMeeting = () => {
    messagesService.createRoom();
  };

  const wrapperStyles: SxProps = {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const paperStyles: SxProps<Theme> = (theme) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '30vh',
    width: '30vw',
    borderRadius: '30px',
    [theme.breakpoints.down('md')]: {
      height: '60vh',
      width: '60vw',
    },
    [theme.breakpoints.down('sm')]: {
      height: '75vh',
      width: '75vw',
    },
  });

  if (createRoomResponse) {
    return (
      <Navigate
        to={createDinamicUrlString(ROUTE.Meeting, {
          meeting_id: createRoomResponse.roomId,
        })}
      />
    );
  }

  return (
    <Page>
      <Box sx={wrapperStyles}>
        <Paper sx={paperStyles}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={startMeeting}
          >
            Start your meeting
          </Button>
        </Paper>
      </Box>
    </Page>
  );
};
