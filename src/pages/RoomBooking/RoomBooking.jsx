import React, { useEffect } from "react";
import { Box, Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRoomDetails } from "../../slices/room";
import { getReviewsList } from "../../slices/review";
import StarIcon from "@mui/icons-material/Star";
import { dFlex } from "../../themes/comonStyles";
import Pluralize from "react-pluralize";
import Payment from "./Payment/Payment";
import RoomDetails from "./RoomDetails/RoomDetails";
import Review from "./Review/Review";
import theme from "../../themes/appThemeProvider";

const RoomBooking = () => {
  const { roomDetails, roomDetailsError } = useSelector((state) => state.room);

  const { reviewsList } = useSelector((state) => state.review);

  const { roomId } = useParams();

  const dispatch = useDispatch();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch(getRoomDetails(roomId));
    dispatch(getReviewsList(roomId));
  }, [roomId]);

  if (roomDetailsError) {
    return <Box>{roomDetailsError}</Box>;
  }
  return (
    <Box sx={{ m: 2 }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {roomDetails.name}
        </Typography>
        <Box sx={{ ...dFlex, mt: 2, alignItems: "center" }}>
          <StarIcon size={18} />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {roomDetails.locationId?.valueate}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mx: 2 }}>
            <Pluralize singular={"review"} count={reviewsList.length} />
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {roomDetails.locationId?.province},{" "}
            {roomDetails.locationId?.country}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ my: 2 }}>
        <Grid container spacing={isMobile ? 3 : 12}>
          <Grid item xs={12} sm={12} md={7} lg={8}>
            <RoomDetails />
          </Grid>

          <Grid item xs={12} sm={12} md={5} lg={4}>
            <Payment />
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box>
        <Review />
      </Box>
    </Box>
  );
};

export default RoomBooking;
