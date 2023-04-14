import { Outlet } from 'react-router-dom';

import { Header } from './components';
import { Box } from '@mui/material';

export const App = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      <Outlet />
    </Box>
  );
};
