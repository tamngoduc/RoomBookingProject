import React from "react";
import OptionsTab from "../../template/MainTemplate/OptionBar/optionTab";
import { Box, Container } from "@mui/material";
import LocationCard from "./Carousel/LocationCard";

const Home = () => {
  return (
    <Box>
      <OptionsTab />
      <Container maxWidth="xl" sx={{ mb: 3 }}>
        <LocationCard />
      </Container>
    </Box>
  );
};

export default Home;
