import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { registerAccount, resetAuth } from "../../slices/auth";
import { authBlur } from "../../themes/comonStyles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
const theme = createTheme();

const SignUp = () => {
  const { registerUser, isRegisterLoading, registerError } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetAuth());
    };
  }, []);

  useEffect(() => {
    if (Object.keys(registerUser).length) {
      successAlert("success");
    }
  }, [registerUser]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      repass: "",
      gender: null,
      birthday: "",
    },
    mode: "onTouched",
  });

  const [type, setType] = useState("text");

  const { enqueueSnackbar } = useSnackbar();

  const password = watch("password");

  const dateOnFocus = () => {
    setType("date");
  };

  const successAlert = (variant) => {
    enqueueSnackbar("Register successfully!", { variant });
  };

  const onSubmit = (user) => {
    if (user.gender === "male") {
      dispatch(registerAccount({ ...user, gender: true }));
    }
    if (user.gender === "female") {
      dispatch(registerAccount({ ...user, gender: false }));
    }
  };

  const onError = (errors) => {
    console.log(errors);
  };

  if (Object.keys(registerUser).length) {
    return <Navigate to="/login" replace />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={authBlur}>
        <CssBaseline />
        <Box
          sx={{
            m: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "red" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{ mb: 2, fontWeight: "bold" }}
          >
            Sign up
          </Typography>
          <br />
          <Box>
            <form sx={{ mt: 3 }} onSubmit={handleSubmit(onSubmit, onError)}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="name"
                    label="Name"
                    type="text"
                    id="name"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Please input your name!",
                      },
                      pattern: {
                        value:
                          /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
                        message: "Your name is not correct!",
                      },
                    })}
                    error={!!errors?.name}
                    helperText={errors?.name ? errors.name.message : null}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="phone"
                    label="Phone Number"
                    type="number"
                    id="phone"
                    {...register("phone", {
                      required: {
                        value: true,
                        message: "Please input your Phone number!",
                      },
                      pattern: {
                        value: /^[0-9\-+]{9,15}$/,
                        message: "Your phone number is not correct!",
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
                    name="email"
                    label="Email"
                    type="email"
                    id="email"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Please input your email!",
                      },
                      pattern: {
                        value:
                          /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
                        message: "Your email is not correct!",
                      },
                    })}
                    error={!!errors?.email}
                    helperText={errors?.email ? errors.email.message : null}
                  />
                </Grid>
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
                    helperText={
                      errors?.password ? errors.password.message : null
                    }
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
                    helperText={
                      errors?.birthday ? errors.birthday.message : null
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="subtitle2">Gender</Typography>
                  <Grid
                    container
                    sx={{
                      border: "1px solid #9e9e9e",
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
                        helperText={
                          errors?.gender ? errors.gender.message : null
                        }
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
                        helperText={
                          errors?.gender ? errors.gender.message : null
                        }
                      />
                      <label htmlFor="female">Female</label>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* show error when fail to call API*/}
              {registerError && <span>{registerError}</span>}
              {/*  */}
              {/* btn to submit form */}
              <Button
                type="submit"
                disabled={isRegisterLoading}
                fullWidth
                variant="contained"
                size="large"
                color="error"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </form>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link style={{ textDecoration: "none" }} to="/login">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
