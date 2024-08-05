import colors from '../../../colors';

import type { ThemeOptions } from '@mui/material'

export const Inputs: ThemeOptions['components'] = {
  MuiInputBase: {
    styleOverrides: {
      root: {
        background: colors.licorice[800],
      },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        textAlign: 'right',
      },
    },
  },
}
