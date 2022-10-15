import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FaRegUserCircle, FaUserPlus } from "react-icons/fa";
import { GrLogout } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../slices/auth";
import { Avatar } from "@mui/material";
import { getUserDetails } from "../../../slices/user";

const FooterMenu = () => {
  const { currentUser } = useSelector((state) => state.auth);

  const { userDetails, updatedUserResponse, uploadedAvatarResponse } =
    useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(currentUser).length && !Object.keys(userDetails).length) {
      dispatch(getUserDetails(currentUser.user?._id));
    }
  }, [currentUser.user?._id, updatedUserResponse, uploadedAvatarResponse]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
      <Stack>
        {Object.keys(currentUser).length ? (
          <Button onClick={() => navigate("/account")}>
            <Stack
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
              direction="column"
              spacing={0}
            >
              <Avatar
                src={userDetails.avatar ? userDetails.avatar : null}
                sx={{ width: 18, height: 18 }}
              />
              <Typography>{userDetails.name}</Typography>
            </Stack>
          </Button>
        ) : (
          <Button onClick={() => navigate("/login")}>
            <Stack
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
              direction="column"
              spacing={0}
            >
              <FaRegUserCircle size={18} />
              <Typography>Login</Typography>
            </Stack>
          </Button>
        )}

        {Object.keys(currentUser).length ? (
          <Button onClick={handleLogout}>
            <Stack
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
              direction="column"
              spacing={0}
            >
              <GrLogout size={24} />
              <Typography>Logout</Typography>
            </Stack>
          </Button>
        ) : (
          <Button onClick={() => navigate("/sign-up")}>
            <Stack
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
              direction="column"
              spacing={0}
            >
              <FaUserPlus size={18} />
              <Typography>Sign Up</Typography>
            </Stack>
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default FooterMenu;
