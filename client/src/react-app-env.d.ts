/// <reference types="react-scripts" />

import styles from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    background: Palette['primary'];
  }

  interface PaletteOptions {
    background: PaletteOptions['primary'];
  }
}
