import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Logo from "./Logo";
import LocationSearch from "../../../components/LocationSearch/LocationSearch";
import ProfileSetting from "./ProfileSetting";
import {
  flexBetweenCenter,
  dFlex,
  displayOnDesktop,
} from "../../../themes/comonStyles";

const Header = () => {
  return (
    <Box
      sx={{
        ...dFlex,
        minHeight: 70,
        borderBottom: "1px solid #ddd",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            ...flexBetweenCenter,
            minHeight: 90,
            px: 4,
          }}
        >
          <Box sx={displayOnDesktop}>
            <Logo />
          </Box>

          <Box>
            <LocationSearch />
          </Box>

          <Box sx={displayOnDesktop}>
            <ProfileSetting />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
