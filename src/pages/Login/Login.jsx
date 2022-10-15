import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../slices/auth";
import { authBlur } from "../../themes/comonStyles";

const Login = () => {
  const { currentUser, isLoginLoading, loginError } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  const onError = (errors) => {
    console.log(errors);
  };

  if (Object.keys(currentUser).length) {
    return <Navigate to="/" replace />;
  }

  return (
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
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <TextField
            required
            fullWidth
            type="email"
            id="email"
            label="Email"
            name="email"
            {...register("email", {
              required: {
                value: true,
                message: "Please input your email!",
              },
            })}
            error={!!errors?.email}
            helperText={errors?.email ? errors.email.message : null}
          />
          <br />
          <br />

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
            })}
            error={!!errors?.password}
            helperText={errors?.password ? errors.password.message : null}
          />
          {/* show error when fail to call API*/}
          {loginError && <span>{loginError}</span>}
          {/*  */}
          {/* btn to submit form */}
          <Button
            disabled={isLoginLoading}
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            color="error"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </form>

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link style={{ textDecoration: "none" }} to="/sign-up">
              I don't have an account? Sign up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
