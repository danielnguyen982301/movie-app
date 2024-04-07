import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Button, Stack, Typography } from "@mui/material";
import { FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
});

const defaultValues = {
  username: "",
};

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: Record<string, any>) => {
    let from = location.state?.from?.pathname || "/";
    let username = data.username;

    auth.login(username, () => {
      navigate(
        { pathname: from, search: location.state?.from?.search },
        { replace: true }
      );
    });
  };

  return (
    <Stack justifyContent="center" alignItems="center" minHeight="100vh">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ minWidth: "350px" }}>
          <Typography variant="h4" textAlign="center">
            Login
          </Typography>
          <FTextField name="username" label="Username" />

          <Button type="submit" variant="contained">
            Login
          </Button>
        </Stack>
      </FormProvider>
    </Stack>
  );
}

export default LoginPage;
