import React from "react";
import { Box, CircularProgress } from "@mui/material";
import UserCard from "./UserCard";
import { Grid } from "@mui/material";
import TableTicket from "./TableTickket";
import { useSelector } from "react-redux";
import { flexCenter } from "../../themes/comonStyles";

const UserProfile = () => {
  const { isUserDetailsLoading } = useSelector((state) => state.user);

  return (
    <Box>
      <Grid container spacing={0}>
        <Grid
          item
          sx={{
            ...flexCenter,
            mt: 2,
          }}
          xs={12}
          sm={12}
          md={6}
          lg={6}
        >
          {isUserDetailsLoading ? <CircularProgress /> : <UserCard />}
        </Grid>
        <Grid
          item
          sx={{
            ...flexCenter,
            mt: 6,
          }}
          xs={12}
          sm={12}
          md={6}
          lg={6}
        >
          <TableTicket />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
