import React from "react";
import { SnackbarProvider } from "notistack";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import theme from "../../themes/appThemeProvider";

const AuthTemplate = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <SnackbarProvider maxSnack={3}>
      <Box
        sx={{
          backgroundImage: "url(/images/authBg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: `${isMobile ? "left top" : "center"}`,
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet />
      </Box>
    </SnackbarProvider>
  );
};

export default AuthTemplate;
