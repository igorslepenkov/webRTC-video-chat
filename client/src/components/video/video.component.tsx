import { Box, SxProps, Theme } from '@mui/material';
import { useEffect, useRef } from 'react';

interface IProps {
  videoStream: MediaStream | null;
}

export const Video = ({ videoStream }: IProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoContainerStyles: SxProps<Theme> = (theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.contrastText,
    borderRadius: '20px',
  });

  const videoStyles: SxProps<Theme> = (theme) => ({
    width: '100%',
    height: 'auto',
  });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  return (
    <Box sx={videoContainerStyles}>
      <Box component="video" autoPlay sx={videoStyles} ref={videoRef}></Box>
    </Box>
  );
};
