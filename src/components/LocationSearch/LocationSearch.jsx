import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getLocationsList } from "../../slices/location";
import { Autocomplete, TextField } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const LocationSearch = () => {
  const { locationsList } = useSelector((state) => state.location);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (!locationsList.length) {
      dispatch(getLocationsList(""));
    }
  }, []);

  let display = "none";

  const handleSearch = (e) => {
    if (
      e.target.value !== "" &&
      e.target.value !== " " &&
      e.target.value.length > 1
    ) {
      display = "display";
    } else {
      display = "none";
    }
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
      }}
    >
      <IconButton sx={{ p: "10px" }}>
        <FaSearch />
      </IconButton>

      <Autocomplete
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={locationsList}
        getOptionLabel={(option) => {
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name || "";
        }}
        renderOption={(props, option) =>
          display === "display" && (
            <li
              {...props}
              key={option._id}
              onClick={() => {
                navigate(`/rooms/${option._id}`);
                display = "none";
              }}
            >
              <LocationOnOutlinedIcon />
              {option.name}
            </li>
          )
        }
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Where to go" onChange={handleSearch} />
        )}
      />
    </Paper>
  );
};

export default LocationSearch;
