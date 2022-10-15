import React from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { Fragment } from "react";
import { addUser, updateUser } from "../../slices/user";

const UserForm = ({ user, onModal }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: user
      ? {
          _id: user[0],
          name: user[1],
          email: user[2],
          phone: user[3],
          address: user[4],
          gender: user[5] ? "male" : "female",
          birthday: user[6]?.slice(0, 10),
          type: user[7],
        }
      : {},
    mode: "onTouched",
  });

  const [type, setType] = useState("text");

  const { enqueueSnackbar } = useSnackbar();

  const dateOnFocus = () => {
    setType("date");
  };

  const password = watch("password");

  const successAlert = (type) => {
    if (type === "update") {
      enqueueSnackbar("Update user successfully!", { variant: "success" });
    }
    if (type === "add") {
      enqueueSnackbar("Add user successfully!", { variant: "success" });
    }
  };

  const errorAlert = (error) => {
    enqueueSnackbar(`${error}`, {
      variant: "error",
    });
  };

  const onSubmit = (user) => {
    const userId = user._id;
    if (userId) {
      if (user.gender === "male") {
        dispatch(
          updateUser({
            userId,
            user: { ...user, gender: true },
            successAlert,
            errorAlert,
            type: "update",
          })
        );
      }
      if (user.gender === "female") {
        dispatch(
          updateUser({
            userId,
            user: { ...user, gender: false },
            successAlert,
            errorAlert,
            type: "update",
          })
        );
      }
    } else {
      if (user.gender === "male") {
        dispatch(
          addUser({
            user: { ...user, gender: true },
            successAlert,
            errorAlert,
            type: "add",
          })
        );
      }
      if (user.gender === "female") {
        dispatch(
          addUser({
            user: { ...user, gender: false },
            successAlert,
            errorAlert,
            type: "add",
          })
        );
      }
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
                  message: "Please input name!",
                  pattern: {
                    value:
                      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
                    message: "Name is not correct!",
                  },
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
              name="email"
              label="Email"
              type="text"
              {...register("email", {
                required: {
                  value: true,
                  message: "Please input email!",
                },
                pattern: {
                  value:
                    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
                  message: "Email is not correct!",
                },
              })}
              error={!!errors?.email}
              helperText={errors?.email ? errors.email.message : null}
            />
          </Grid>
          {!user ? (
            <Fragment>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Please input your password!",
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                      message:
                        "Minimum eight characters, at least one letter and one number !",
                    },
                  })}
                  error={!!errors?.password}
                  helperText={errors?.password ? errors.password.message : null}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  name="repass"
                  label="Confirm Password"
                  type="password"
                  id="repass"
                  {...register("repass", {
                    required: {
                      value: true,
                      message: "Please confirm your password!",
                    },
                    validate: (value) =>
                      value === password || "Password do not match!",
                  })}
                  error={!!errors?.repass}
                  helperText={errors?.repass ? errors.repass.message : null}
                />
              </Grid>
            </Fragment>
          ) : null}
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              name="phone"
              label="Phone"
              type="number"
              {...register("phone", {
                required: {
                  value: true,
                  message: "Please input phone!",
                },
                pattern: {
                  value: /^[0-9\-+]{9,15}$/,
                  message: "Phone number is not correct!",
                },
              })}
              error={!!errors?.phone}
              helperText={errors?.phone ? errors.phone.message : null}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              name="address"
              label="Address"
              type="text"
              {...register("address", {
                required: {
                  value: true,
                  message: "Please input address!",
                },
              })}
              error={!!errors?.address}
              helperText={errors?.address ? errors.address.message : null}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              name="birthday"
              label="Date of birth"
              type={type}
              onFocus={dateOnFocus}
              {...register("birthday", {
                required: {
                  value: true,
                  message: "Please input birthday!",
                },
              })}
              error={!!errors?.birthday}
              helperText={errors?.birthday ? errors.birthday.message : null}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle2">Gender</Typography>
            <Grid
              container
              sx={{
                border: "1px solid #ddd",
                borderRadius: "5px",
                mb: 1.5,
                py: 1,
                pl: 7,
              }}
            >
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <TextField
                  id="male"
                  required
                  name="gender"
                  variant="standard"
                  type="radio"
                  value="male"
                  {...register("gender", {
                    required: {
                      value: true,
                      message: "Please input gender!",
                    },
                  })}
                  error={!!errors?.gender}
                  helperText={errors?.gender ? errors.gender.message : null}
                />
                <label htmlFor="male">Male</label>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <TextField
                  id="female"
                  required
                  name="gender"
                  type="radio"
                  variant="standard"
                  value="female"
                  {...register("gender", {
                    required: {
                      value: true,
                      message: "Please input gender!",
                    },
                  })}
                  error={!!errors?.gender}
                  helperText={errors?.gender ? errors.gender.message : null}
                />
                <label htmlFor="female">Female</label>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle2">Type</Typography>
            <Grid
              container
              sx={{
                border: "1px solid #ddd",
                borderRadius: "5px",
                mb: 1.5,
                py: 1,
                pl: 7,
              }}
            >
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <TextField
                  required
                  name="type"
                  type="radio"
                  value="CLIENT"
                  variant="standard"
                  {...register("type", {
                    required: {
                      value: true,
                      message: "Please input type!",
                    },
                  })}
                  error={!!errors?.type}
                  helperText={errors?.type ? errors.type.message : null}
                />
                <span>CLIENT</span>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <TextField
                  required
                  name="type"
                  type="radio"
                  variant="standard"
                  value="ADMIN"
                  {...register("type", {
                    required: {
                      value: true,
                      message: "Please input type!",
                    },
                  })}
                  error={!!errors?.type}
                  helperText={errors?.type ? errors.type.message : null}
                />
                <span>ADMIN</span>
              </Grid>
            </Grid>
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
          {user ? "Update" : "Add"}
        </Button>
      </form>
    </Box>
  );
};

export default UserForm;
