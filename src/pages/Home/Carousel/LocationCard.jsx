import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CarouselCard from "./CarouselCard";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

const LocationCard = () => {
  const { locationsList, isLocationsListLoading, locationsListError } =
    useSelector((state) => state.location);

  if (locationsListError) {
    return <Box>{locationsListError}</Box>;
  }

  return (
    <Box sx={{ mx: 2 }}>
      {isLocationsListLoading ? (
        <CircularProgress />
      ) : (
        <Grid container rowSpacing={3} columnSpacing={3}>
          {locationsList.map((location) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={location._id}>
                <CarouselCard location={location} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default LocationCard;
