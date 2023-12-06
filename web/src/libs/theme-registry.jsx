"use client";

import { theme } from "@/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { EmotionCacheProvider } from "./emotion-cache";

export const ThemeRegistry = ({ children }) => {
  return (
    <EmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </EmotionCacheProvider>
  );
};

// export default ThemeRegistry;
