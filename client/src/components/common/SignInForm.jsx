import React from "react";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import userAPI from "../../api/modules/user.api";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setUser } from "../../redux/features/userSlice";

const SignInForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signInForm = useFormik({
    initialValues: {
      password: "",
      username: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(6, "Username Must be min 6 characters")
        .required("Please select a username"),
      password: Yup.string()
        .min(6, "Your password must be min 6 characters")
        .required("Please select a password"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      const { response, error } = await userAPI.signIn(values);
      setIsLoginRequest(false);

      if (response) {
        signInForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success("Login Successful! Welcome back!");
      }
      if (error) setErrorMessage(error.message);
    },
  });

  return (
    <>
      <Box component="form" onSubmit={signInForm.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            type="text"
            placeholder="Enter your Username"
            name="username"
            fullWidth
            value={signInForm.values.username}
            onChange={signInForm.handleChange}
            color="success"
            error={
              signInForm.touched.username &&
              signInForm.errors.username !== undefined
            }
            helperText={
              signInForm.touched.username && signInForm.errors.username
            }
          />
          <TextField
            type="password"
            placeholder="Enter Your Password"
            name="password"
            fullWidth
            value={signInForm.values.password}
            onChange={signInForm.handleChange}
            color="success"
            error={
              signInForm.touched.password &&
              signInForm.errors.password !== undefined
            }
            helperText={
              signInForm.touched.password && signInForm.errors.password
            }
          />
        </Stack>

        <LoadingButton
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          sx={{ marginTop: 4 }}
          loading={isLoginRequest}
        >
          sign in
        </LoadingButton>

        <Button
          fullWidth
          sx={{ marginTop: "1rem" }}
          onClick={() => switchAuthState()}
        >
          sign up
        </Button>

        {errorMessage && (
          <Box sx={{ marginTop: 2 }}>
            <Alert severity="error" variant="outlined">
              {errorMessage}
            </Alert>
          </Box>
        )}
      </Box>
    </>
  );
};

export default SignInForm;
