import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <Box
    sx={{
      height: "100vh",
      backgroundImage: "url(/images/404Bg.jpg)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "contain",
      position: "relative",
      margin: "auto",
    }}
  >
    <Box
      sx={{
        position: "absolute",
        top: "80%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontWeight: "bold",
      }}
    >
      <Link to="/">Go Home</Link>
    </Box>
  </Box>
);

export default NotFound;
