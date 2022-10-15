import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { useNavigate } from "react-router-dom";

const ListItemBar = () => {
  const navigate = useNavigate();

  const items = [
    { href: "/admin/users", title: "User Manager", icon: <PeopleIcon /> },
    {
      href: "/admin/locations",
      title: "Location Manager",
      icon: <LocationOnRoundedIcon />,
    },
    { href: "/admin/rooms", title: "Room Manager", icon: <HomeRoundedIcon /> },
  ];

  return (
    <React.Fragment>
      {items.map((item) => (
        <ListItemButton
          key={item.title}
          onClick={() => navigate(`${item.href}`)}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      ))}
    </React.Fragment>
  );
};

export default ListItemBar;
