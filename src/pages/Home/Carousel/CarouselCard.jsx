import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { AiFillStar } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import {
  flexBetween,
  dFlex,
  fixedIcon,
  carouselImage,
} from "../../../themes/comonStyles";
import { useNavigate } from "react-router-dom";

const CarouselCard = ({ location }) => {
  const navigate = useNavigate();

  return (
    <Box
      className="carouselCard"
      sx={{
        flexGrow: 1,
        position: "relative",
        cursor: "pointer",
        "&:hover": {
          opacity: 0.8,
        },
      }}
      onClick={() => navigate(`/rooms/${location._id}`)}
    >
      <Box sx={fixedIcon}>
        <FaRegHeart size={24} color="#fff" />
      </Box>

      <Box
        borderRadius="solid 2px"
        width="100%"
        component="img"
        src={
          location.image && location.image.length > 0
            ? location.image
            : "https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?k=20&m=1357365823&s=612x612&w=0&h=ZH0MQpeUoSHM3G2AWzc8KkGYRg4uP_kuu0Za8GFxdFc="
        }
        sx={carouselImage}
      />

      <Box sx={flexBetween}>
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="subtitle1"
            component="h1"
            sx={{ fontWeight: "bold" }}
          >
            {location.name}
          </Typography>
          <Typography variant="subtitle2" component="h1" sx={{ p: 0 }}>
            {location.province}, {location.country}
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Box sx={dFlex}>
            <React.Fragment>
              <Typography variant="subtitle2" component="h5">
                {" "}
                {location.valueate}
              </Typography>
              <AiFillStar size={18} />
            </React.Fragment>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CarouselCard;
