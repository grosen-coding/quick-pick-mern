import React from "react";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useFormik, userFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import userAPI from "../../api/modules/user.api";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setUser } from "../../redux/features/userSlice";

const SignUpForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signUpForm = useFormik({
    initialValues: {
      password: "",
      username: "",
      displayName: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      username: Yup.string()
        .min(6, "Username Must be min 6 characters")
        .required("Please select a username"),
      password: Yup.string()
        .min(6, "Your password must be min 6 characters")
        .required("Please select a password"),
      displayName: Yup.string()
        .min(6, "Your displayName must be min 6 characters")
        .required("Please select a displayName"),
      confirmPassword: Yup.string()
        .min(6, "Your confirmPassword must be min 6 characters")
        .required("Please select a confirmPassword"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      const { response, error } = await userAPI.signUp(values);
      setIsLoginRequest(false);

      if (response) {
        signUpForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success("Login Successful! Welcome back!");
      }
      if (error) setErrorMessage(error.message);
    },
  });

  return (
    <>
      <Box component="form" onSubmit={signUpForm.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            type="text"
            placeholder="Enter your Username"
            name="username"
            fullWidth
            value={signUpForm.values.username}
            onChange={signUpForm.handleChange}
            color="success"
            error={
              signUpForm.touched.username &&
              signUpForm.errors.username !== undefined
            }
            helperText={
              signUpForm.touched.username && signUpForm.errors.username
            }
          />
          <TextField
            type="text"
            placeholder="Enter a Display Name"
            name="displayName"
            fullWidth
            value={signUpForm.values.displayName}
            onChange={signUpForm.handleChange}
            color="success"
            error={
              signUpForm.touched.displayName &&
              signUpForm.errors.displayName !== undefined
            }
            helperText={
              signUpForm.touched.displayName && signUpForm.errors.displayName
            }
          />
          <TextField
            type="password"
            placeholder="Enter Your Password"
            name="password"
            fullWidth
            value={signUpForm.values.password}
            onChange={signUpForm.handleChange}
            color="success"
            error={
              signUpForm.touched.password &&
              signUpForm.errors.password !== undefined
            }
            helperText={
              signUpForm.touched.password && signUpForm.errors.password
            }
          />
          <TextField
            type="password"
            placeholder="Please Confirm Your Password"
            name="confirmPassword"
            fullWidth
            value={signUpForm.values.confirmPassword}
            onChange={signUpForm.handleChange}
            color="success"
            error={
              signUpForm.touched.confirmPassword &&
              signUpForm.errors.confirmPassword !== undefined
            }
            helperText={
              signUpForm.touched.confirmPassword &&
              signUpForm.errors.confirmPassword
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
          sign up
        </LoadingButton>

        <Button
          fullWidth
          sx={{ marginTop: "1rem" }}
          onClick={() => switchAuthState()}
        >
          sign in
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

export default SignUpForm;
