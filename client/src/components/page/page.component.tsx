import { ReactNode } from 'react';
import { Container } from '@mui/material';

interface IProps {
  children: ReactNode;
}

export const Page = ({ children }: IProps) => {
  return (
    <Container
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
      maxWidth="lg"
    >
      {children}
    </Container>
  );
};
