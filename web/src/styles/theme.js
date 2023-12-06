"use client";

import {
  ERROR_COLOR,
  EXTRA_COLOR,
  INFO_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  SUCCESS_COLOR,
  WARNING_COLOR,
  inter,
} from "@/styles";
import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: PRIMARY_COLOR },
    secondary: { main: SECONDARY_COLOR },
    error: { main: ERROR_COLOR },
    warning: { main: WARNING_COLOR },
    info: { main: INFO_COLOR },
    success: { main: SUCCESS_COLOR },
    extra: { main: EXTRA_COLOR },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
});
