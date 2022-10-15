import React from "react";
import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
// react icons
import { FaFilter } from "react-icons/fa";
import {
  MdOutlineApartment,
  MdHouseSiding,
  MdOutlineWater,
  MdCabin,
} from "react-icons/md";
import { BsSnow } from "react-icons/bs";
import { BiHomeAlt } from "react-icons/bi";
import {
  GiKidSlide,
  GiSpaceNeedle,
  GiCampingTent,
  GiLightningDome,
  GiEvilTree,
  GiWaveSurfer,
  GiMountainCave,
  GiCaveEntrance,
  GiGolfFlag,
} from "react-icons/gi";
import { AiOutlineCoffee } from "react-icons/ai";
import { FaCampground, FaUmbrellaBeach, FaSwimmingPool } from "react-icons/fa";
import { RiEarthquakeFill } from "react-icons/ri";

const OptionsTab = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const locationsTab = [
    { id: 1, label: "Design", icon: <MdOutlineApartment size={24} /> },
    { id: 2, label: "Arctic", icon: <BsSnow size={24} /> },
    { id: 3, label: "Shared Homes", icon: <MdHouseSiding size={24} /> },
    { id: 4, label: "LakeFront", icon: <MdOutlineWater size={24} /> },
    { id: 5, label: "National Parks", icon: <GiKidSlide size={24} /> },
    { id: 6, label: "Bed & Breakfast ", icon: <AiOutlineCoffee size={24} /> },
    { id: 7, label: "OMG!", icon: <GiSpaceNeedle size={24} /> },
    { id: 8, label: "Camping", icon: <FaCampground size={24} /> },
    { id: 9, label: "A-frames", icon: <GiCampingTent size={24} /> },
    { id: 10, label: "Domes", icon: <GiLightningDome size={24} /> },
    { id: 11, label: "Tiny Homes", icon: <BiHomeAlt size={24} /> },
    { id: 12, label: "Treehouses", icon: <GiEvilTree size={24} /> },
    { id: 13, label: "Surfing", icon: <GiWaveSurfer size={24} /> },
    { id: 14, label: "CountrySide", icon: <GiMountainCave size={24} /> },
    { id: 15, label: "Caves", icon: <GiCaveEntrance size={24} /> },
    { id: 16, label: "Golfing", icon: <GiGolfFlag size={24} /> },
    { id: 17, label: "Cabins", icon: <MdCabin size={24} /> },
    { id: 18, label: "Earth Homes", icon: <RiEarthquakeFill size={24} /> },
    { id: 19, label: "Tropical", icon: <FaUmbrellaBeach size={24} /> },
    { id: 20, label: "Amazing Pools", icon: <FaSwimmingPool size={24} /> },
  ];

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          px: { xs: 0, md: 2 },
          alignItems: "center",
          mt: 2,
          mb: 2,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              "&.Mui-disabled": { opacity: 0.3 },
            },
          }}
        >
          {locationsTab.map((tab) => {
            return <Tab key={tab.id} icon={tab.icon} label={tab.label} />;
          })}
        </Tabs>
        <Button
          sx={{
            display: { xs: "none", md: "block" },
            border: "1px solid #ddd",
            minWidth: 90,
            justifyContent: "space-between",
            borderRadius: 2,
            textTransform: "capitalize",
            py: 1,
            color: "theme.palette.text.primary",
          }}
        >
          <FaFilter /> Filters
        </Button>
      </Box>
    </Container>
  );
};

export default OptionsTab;
