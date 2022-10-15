import React from "react";
import {
  Box,
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Pluralize from "react-pluralize";
import theme from "../../../themes/appThemeProvider";
import ElevatorOutlinedIcon from "@mui/icons-material/ElevatorOutlined";
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import MicrowaveOutlinedIcon from "@mui/icons-material/MicrowaveOutlined";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import ConnectedTvOutlinedIcon from "@mui/icons-material/ConnectedTvOutlined";
import HotTubOutlinedIcon from "@mui/icons-material/HotTubOutlined";
import PoolOutlinedIcon from "@mui/icons-material/PoolOutlined";
import FireplaceOutlinedIcon from "@mui/icons-material/FireplaceOutlined";
import LocalLaundryServiceOutlinedIcon from "@mui/icons-material/LocalLaundryServiceOutlined";
import { useSelector } from "react-redux";

const RoomDetails = () => {
  const { roomDetails } = useSelector((state) => state.room);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <Box>
        <Box
          sx={{
            backgroundImage: `url(${roomDetails.image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: `${isMobile ? "20vh" : "40vh"}`,
            width: "100%",
            borderRadius: 5,
            mb: 2,
          }}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          <Pluralize singular={"guest"} count={roomDetails.guests} />
          <span> - </span>
          <Pluralize singular={"bed room"} count={roomDetails.bedRoom} />
          <span> - </span>
          <Pluralize singular={"bath"} count={roomDetails.bath} />
        </Typography>
      </Box>
      <Divider sx={{ my: 4 }} />
      <Box>
        <Typography variant="body">{roomDetails.description}</Typography>
      </Box>
      <Divider sx={{ my: 4 }} />
      <Box>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Amenities
        </Typography>
        <Grid container sx={{ mt: 2 }}>
          {roomDetails.elevator ? (
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Stack>
                <ElevatorOutlinedIcon sx={{ mr: 1 }} /> Elevator
              </Stack>
            </Grid>
          ) : null}
          {roomDetails.gym ? (
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Stack>
                <FitnessCenterOutlinedIcon sx={{ mr: 1 }} /> Gym
              </Stack>
            </Grid>
          ) : null}
          {roomDetails.kitchen ? (
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Stack>
                <MicrowaveOutlinedIcon sx={{ mr: 1 }} /> Kitchen
              </Stack>
            </Grid>
          ) : null}
          {roomDetails.wifi ? (
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Stack>
                <WifiOutlinedIcon sx={{ mr: 1 }} /> Wifi
              </Stack>
            </Grid>
          ) : null}
          {roomDetails.heating ? (
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Stack>
                <LocalFireDepartmentOutlinedIcon sx={{ mr: 1 }} /> Heating
              </Stack>
            </Grid>
          ) : null}
          {roomDetails.cableTV ? (
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Stack>
                <ConnectedTvOutlinedIcon sx={{ mr: 1 }} /> TV
              </Stack>
            </Grid>
          ) : null}
          {roomDetails.hotTub ? (
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Stack>
                <HotTubOutlinedIcon sx={{ mr: 1 }} /> Hot Tub
              </Stack>
            </Grid>
          ) : null}
          {roomDetails.pool ? (
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Stack>
                <PoolOutlinedIcon sx={{ mr: 1 }} /> Pool
              </Stack>
            </Grid>
          ) : null}
          {roomDetails.indoorFireplace ? (
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Stack>
                <FireplaceOutlinedIcon sx={{ mr: 1 }} /> Fireplace
              </Stack>
            </Grid>
          ) : null}
          {roomDetails.dryer ? (
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Stack>
                <LocalLaundryServiceOutlinedIcon sx={{ mr: 1 }} /> Dryer
              </Stack>
            </Grid>
          ) : null}
        </Grid>
      </Box>
    </Box>
  );
};

export default RoomDetails;
