import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FaAirbnb } from "react-icons/fa";
import { pink } from "@mui/material/colors";
import { flexCenter } from "../../../themes/comonStyles";

const Logo = () => {
  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate("/");
  };

  return (
    <Box sx={{ ...flexCenter, cursor: "pointer" }} onClick={handleClickLogo}>
      <FaAirbnb size={40} color={pink[500]} />
      <Typography
        variant="h3"
        sx={{
          ml: 1,
          color: (theme) => theme.palette.secondary.main,
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        airbnb
      </Typography>
    </Box>
  );
};

export default Logo;
