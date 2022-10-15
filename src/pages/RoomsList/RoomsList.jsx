import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getRoomsList } from "../../slices/room";
import Pluralize from "react-pluralize";
import RoomCard from "./RoomCard";

const RoomsList = () => {
  const { locationId } = useParams();

  const { roomsList, isRoomsListLoading, roomsListError } = useSelector(
    (state) => state.room
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoomsList(locationId));
  }, [locationId]);

  if (roomsListError) {
    return <Box>{roomsListError}</Box>;
  }

  return (
    <Box sx={{ mx: 4 }}>
      {isRoomsListLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          <Typography variant="subtitle1" sx={{ py: 2, fontWeight: "bold" }}>
            <Pluralize singular={"stay"} count={roomsList.length} />
          </Typography>
          <Typography variant="h3" sx={{ pb: 3 }}>
            Stays nearby
          </Typography>
          <Grid container rowSpacing={3} columnSpacing={3}>
            {roomsList.map((room) => {
              return (
                <Grid key={room._id} item xs={12} sm={4} md={4} lg={3}>
                  <RoomCard room={room} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default RoomsList;
