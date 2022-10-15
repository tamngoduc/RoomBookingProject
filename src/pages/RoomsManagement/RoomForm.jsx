import React, { useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import { flexCenter } from "../../themes/comonStyles";
import theme from "../../themes/appThemeProvider";
import { createRoom, updateRoom, uploadRoomImage } from "../../slices/room";
import { useSnackbar } from "notistack";

const RoomForm = ({ room, onModal }) => {
  const { locationsList } = useSelector((state) => state.location);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: room
      ? {
          _id: room[0],
          name: room[1],
          image: room[2],
          location: room[3]?.name,
          guests: room[4],
          bedRoom: room[5],
          bath: room[6],
          description: room[7],
          price: room[8],
          elevator: room[9],
          pool: room[10],
          dryer: room[11],
          gym: room[12],
          kitchen: room[13],
          wifi: room[14],
          heating: room[15],
          cableTV: room[16],
          hotTub: room[17],
          indoorFireplace: room[18],
        }
      : {},
    mode: "onTouched",
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const [locationRoom, setLocationRoom] = useState(
    room ? (room[3] ? room[3].name : "") : ""
  );

  const { enqueueSnackbar } = useSnackbar();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const maxWidth = isMobile ? 100 : 300;

  const successAlert = (type) => {
    if (type === "update") {
      enqueueSnackbar("Update room successfully!", { variant: "success" });
    }
    if (type === "create") {
      enqueueSnackbar("Create room successfully!", { variant: "success" });
    }
  };

  const errorAlert = (error) => {
    enqueueSnackbar(`${error}`, {
      variant: "error",
    });
  };

  const src =
    (selectedImage && URL.createObjectURL(selectedImage)) || (room && room[2]);

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  let locationId;

  const findLocation = () => {
    for (let i in locationsList) {
      if (
        locationsList[i].name
          .toLowerCase()
          .includes(String(locationRoom).toLowerCase()) ||
        locationsList[i].province
          .toLowerCase()
          .includes(String(locationRoom).toLowerCase())
      ) {
        locationId = locationsList[i]._id;
      }
    }
  };

  findLocation();

  const handleLocation = (e) => {
    setLocationRoom(e.target.value);
    findLocation();
  };

  const onSubmit = (room) => {
    const roomId = room._id;

    if (roomId) {
      dispatch(
        updateRoom({
          roomId,
          room: { ...room, locationId },
          successAlert,
          errorAlert,
          type: "update",
        })
      );
      if (selectedImage) {
        const formData = new FormData();
        formData.append("room", selectedImage);
        dispatch(
          uploadRoomImage({
            roomId,
            image: formData,
            successAlert,
            errorAlert,
            type: "update",
          })
        );
      }
    } else {
      dispatch(createRoom({ room, successAlert, errorAlert, type: "create" }));
    }
    onModal();
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <Box>
      <form sx={{ mt: 3 }} onSubmit={handleSubmit(onSubmit, onError)}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              name="name"
              label="Name"
              type="text"
              {...register("name", {
                required: {
                  value: true,
                  message: "Please input room name!",
                },
              })}
              error={!!errors?.name}
              helperText={errors?.name ? errors.name.message : null}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              name="location"
              label="Location"
              type="text"
              value={locationRoom}
              onChange={handleLocation}
              error={!!errors?.location}
              helperText={errors?.location ? errors.location.message : null}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              name="guests"
              label="Guests"
              type="number"
              {...register("guests", {
                required: {
                  value: true,
                  message: "Please input number of guests!",
                },
                pattern: {
                  value: /[0-9]/,
                  message: "Please enter a number!",
                },
              })}
              error={!!errors?.guests}
              helperText={errors?.guests ? errors.guests.message : null}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              name="bedRoom"
              label="Bedroom"
              type="number"
              {...register("bedRoom", {
                required: {
                  value: true,
                  message: "Please input number of bedrooms!",
                },
                pattern: {
                  value: /[0-9]/,
                  message: "Please enter a number!",
                },
              })}
              error={!!errors?.bedRoom}
              helperText={errors?.bedRoom ? errors.bedRoom.message : null}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              name="bath"
              label="Bath"
              type="number"
              {...register("bath", {
                required: {
                  value: true,
                  message: "Please input number of Baths!",
                },
                pattern: {
                  value: /[0-9]/,
                  message: "Please enter a number!",
                },
              })}
              error={!!errors?.bath}
              helperText={errors?.bath ? errors.bath.message : null}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              name="description"
              label="Description"
              type="text"
              {...register("description", {
                required: {
                  value: true,
                  message: "Please input descriptions!",
                },
              })}
              error={!!errors?.description}
              helperText={
                errors?.description ? errors.description.message : null
              }
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              name="price"
              label="Price (VND)"
              type="number"
              {...register("price", {
                required: {
                  value: true,
                  message: "Please input price!",
                },
              })}
              error={!!errors?.price}
              helperText={errors?.price ? errors.price.message : null}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle2">Amenities</Typography>
            <Grid
              container
              sx={{
                border: "1px solid #ddd",
                borderRadius: "5px",
                mb: 1.5,
                py: 1,
                pl: 4,
              }}
            >
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <TextField
                  id="elevator"
                  name="elevator"
                  type="checkbox"
                  variant="standard"
                  {...register("elevator")}
                  error={!!errors?.elevator}
                  helperText={errors?.elevator ? errors.elevator.message : null}
                />
                <label htmlFor="elevator">Elevator</label>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <TextField
                  id="pool"
                  name="pool"
                  type="checkbox"
                  variant="standard"
                  {...register("pool")}
                  error={!!errors?.pool}
                  helperText={errors?.pool ? errors.pool.message : null}
                />
                <label htmlFor="pool">Pool</label>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <TextField
                  id="dryer"
                  name="dryer"
                  type="checkbox"
                  variant="standard"
                  {...register("dryer")}
                  error={!!errors?.dryer}
                  helperText={errors?.dryer ? errors.dryer.message : null}
                />
                <label htmlFor="dryer">Dryer</label>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <TextField
                  id="gym"
                  name="gym"
                  type="checkbox"
                  variant="standard"
                  {...register("gym")}
                  error={!!errors?.gym}
                  helperText={errors?.gym ? errors.gym.message : null}
                />
                <label htmlFor="gym">Gym</label>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <TextField
                  id="kitchen"
                  name="kitchen"
                  type="checkbox"
                  variant="standard"
                  {...register("kitchen")}
                  error={!!errors?.kitchen}
                  helperText={errors?.kitchen ? errors.kitchen.message : null}
                />
                <label htmlFor="kitchen">Kitchen</label>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <TextField
                  id="wifi"
                  name="wifi"
                  type="checkbox"
                  variant="standard"
                  {...register("wifi")}
                  error={!!errors?.wifi}
                  helperText={errors?.wifi ? errors.wifi.message : null}
                />
                <label htmlFor="wifi">Wifi</label>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <TextField
                  id="heating"
                  name="heating"
                  type="checkbox"
                  variant="standard"
                  {...register("heating")}
                  error={!!errors?.heating}
                  helperText={errors?.heating ? errors.heating.message : null}
                />
                <label htmlFor="heating">Heating</label>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <TextField
                  id="cableTV"
                  name="cableTV"
                  type="checkbox"
                  variant="standard"
                  {...register("cableTV")}
                  error={!!errors?.cableTV}
                  helperText={errors?.cableTV ? errors.cableTV.message : null}
                />
                <label htmlFor="cableTV">Cable TV</label>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <TextField
                  id="hotTub"
                  name="hotTub"
                  type="checkbox"
                  variant="standard"
                  {...register("hotTub")}
                  error={!!errors?.hotTub}
                  helperText={errors?.hotTub ? errors.hotTub.message : null}
                />
                <label htmlFor="hotTub">Hot Tub</label>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <TextField
                  id="indoorFireplace"
                  name="indoorFireplace"
                  type="checkbox"
                  variant="standard"
                  {...register("indoorFireplace")}
                  error={!!errors?.indoorFireplace}
                  helperText={
                    errors?.indoorFireplace
                      ? errors.indoorFireplace.message
                      : null
                  }
                />
                <label htmlFor="indoorFireplace">Indoor Fireplace</label>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} sx={flexCenter}>
            <Box
              component="img"
              src={src}
              sx={{
                maxWidth,
                width: "auto",
                borderRadius: 2,
                mr: 2,
              }}
            />
            {room ? (
              <Button className="btn btn-avt" variant="outlined">
                <FileUploadRoundedIcon />
                Choose Image
                <input type="file" accept=".jpg,.png" onChange={imageChange} />
              </Button>
            ) : null}
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          color="error"
          sx={{ mt: 3, mb: 2 }}
        >
          {room ? "Update" : "Add"}
        </Button>
      </form>
    </Box>
  );
};

export default RoomForm;
