import React from "react";
import { Button, Grid, TextField, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import { flexCenter } from "../../themes/comonStyles";
import theme from "../../themes/appThemeProvider";
import {
  createLocation,
  updateLocation,
  uploadLocationImage,
} from "../../slices/location";
import { useSnackbar } from "notistack";

const LocationForm = ({ location, onModal }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: location
      ? {
          _id: location[0],
          name: location[1],
          province: location[2],
          country: location[3],
          valueate: location[5],
        }
      : {},
    mode: "onTouched",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const maxWidth = isMobile ? 100 : 300;

  const successAlert = (type) => {
    if (type === "update") {
      enqueueSnackbar("Update location successfully!", { variant: "success" });
    }
    if (type === "create") {
      enqueueSnackbar("Create location successfully!", { variant: "success" });
    }
  };

  const errorAlert = (error) => {
    enqueueSnackbar(`${error}`, {
      variant: "error",
    });
  };

  const src =
    (selectedImage && URL.createObjectURL(selectedImage)) ||
    (location && location[4]);

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const onSubmit = (location) => {
    const locationId = location._id;

    if (locationId) {
      dispatch(
        updateLocation({
          locationId,
          location,
          successAlert,
          errorAlert,
          type: "update",
        })
      );
      if (selectedImage) {
        const formData = new FormData();
        formData.append("location", selectedImage);
        dispatch(
          uploadLocationImage({
            locationId,
            image: formData,
            successAlert,
            errorAlert,
            type: "update",
          })
        );
      }
    } else {
      dispatch(
        createLocation({ location, successAlert, errorAlert, type: "create" })
      );
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
                  message: "Please input location name!",
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
              name="province"
              label="Province"
              type="text"
              {...register("province", {
                required: {
                  value: true,
                  message: "Please input province!",
                },
              })}
              error={!!errors?.province}
              helperText={errors?.province ? errors.province.message : null}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              name="country"
              label="Country"
              type="text"
              {...register("country", {
                required: {
                  value: true,
                  message: "Please input country!",
                },
              })}
              error={!!errors?.country}
              helperText={errors?.country ? errors.country.message : null}
            />
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
            {location ? (
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
          {location ? "Update" : "Add"}
        </Button>
      </form>
    </Box>
  );
};

export default LocationForm;
