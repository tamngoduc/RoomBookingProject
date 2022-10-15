import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { BsGlobe } from "react-icons/bs";
import { FaRegUserCircle, FaUserPlus } from "react-icons/fa";
import { GrLogout } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { flexCenter } from "../../../themes/comonStyles";
import { Avatar } from "@mui/material";
import { logout } from "../../../slices/auth";
import { getUserDetails } from "../../../slices/user";

const ProfileSetting = () => {
  const { currentUser } = useSelector((state) => state.auth);

  const { userDetails, updatedUserResponse, uploadedAvatarResponse } =
    useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(currentUser).length) {
      dispatch(getUserDetails(currentUser.user?._id));
    }
  }, [currentUser.user?._id, updatedUserResponse, uploadedAvatarResponse]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Box sx={flexCenter}>
      <Stack>
        <Button>
          <Button href="#">Become a Host</Button>
          <BsGlobe size={24} />
        </Button>
      </Stack>

      <Stack justifyContent="flex-end">
        {Object.keys(currentUser).length ? (
          <Button onClick={() => navigate("/account")}>
            <Avatar src={userDetails.avatar ? userDetails.avatar : null} />
            <Typography>{userDetails.name}</Typography>
          </Button>
        ) : (
          <Button
            sx={{ boderRadius: 10, border: "1px solid #ddd" }}
            onClick={() => navigate("/login")}
          >
            <FaRegUserCircle size={24} />
            <Typography>Login</Typography>
          </Button>
        )}

        {Object.keys(currentUser).length ? (
          <Button
            sx={{ boderRadius: 10, border: "1px solid #ddd" }}
            onClick={handleLogout}
          >
            <GrLogout size={24} />
            <Typography>Logout</Typography>
          </Button>
        ) : (
          <Button
            sx={{ boderRadius: 10, border: "1px solid #ddd" }}
            onClick={() => navigate("/sign-up")}
          >
            <FaUserPlus size={24} />
            <Typography>Sign Up</Typography>
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default ProfileSetting;
