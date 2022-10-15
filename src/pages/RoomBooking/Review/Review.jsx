import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { dFlex } from "../../../themes/comonStyles";
import StarIcon from "@mui/icons-material/Star";
import Pluralize from "react-pluralize";
import { useSelector } from "react-redux";

const Review = () => {
  const { roomDetails } = useSelector((state) => state.room);

  const { reviewsList } = useSelector((state) => state.review);

  const [visible, setVisible] = useState(6);

  const showMoreItems = () => {
    setVisible((preValue) => preValue + 4);
  };

  return (
    <Box>
      <Box sx={{ ...dFlex, alignItems: "center" }}>
        <StarIcon size={18} />
        <Typography variant="h6" sx={{ fontWeight: "bold", mr: 1 }}>
          {roomDetails.locationId?.valueate}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold", mr: 1 }}>
          (<Pluralize singular={"review"} count={reviewsList.length} />)
        </Typography>
      </Box>

      {reviewsList.length ? (
        <Box sx={{ my: 2 }}>
          <Grid container>
            {reviewsList.slice(0, visible).map((review) => {
              return (
                <Grid item key={review._id} xs={12} sm={12} md={6} lg={6}>
                  <Box sx={{ my: 2, mr: 2 }}>
                    <Box sx={{ ...dFlex, alignItems: "center", mb: 1 }}>
                      <Box sx={{ mr: 1 }}>
                        <Avatar src={review.userId?.avatar} />
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold", mx: 1 }}
                        >
                          {review.userId?.name}
                        </Typography>
                        <Typography variant="subtitle1">
                          {String(review.updatedAt).slice(0, 10)}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">
                        {review.content}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
          {reviewsList.length > 8 ? (
            <Button
              sx={{ my: 2 }}
              variant="contained"
              size="medium"
              color="info"
              onClick={showMoreItems}
              disabled={reviewsList.length <= visible ? true : false}
            >
              Show more
            </Button>
          ) : null}
        </Box>
      ) : null}
    </Box>
  );
};

export default Review;
