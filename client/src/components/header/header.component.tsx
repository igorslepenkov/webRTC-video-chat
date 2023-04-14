import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import { ROUTE } from '../../router';

export const Header = () => {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate(ROUTE.Home);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Video Chat
        </Typography>
        <Button color="inherit" onClick={navigateHome}>
          Home
        </Button>
      </Toolbar>
    </AppBar>
  );
};
