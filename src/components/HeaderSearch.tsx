import { Search } from "@mui/icons-material";
import { Button, InputAdornment, Stack } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { FTextField, FormProvider } from "./form";
import { createSearchParams, useNavigate } from "react-router-dom";

type InputValues = {
  query: string;
};

export default function HeaderSearch() {
  const navigate = useNavigate();
  const methods = useForm<InputValues>({ defaultValues: { query: "" } });
  const onSubmit = (data: InputValues) => {
    navigate({
      pathname: "/search",
      search: `?${createSearchParams({ query: data.query })}`,
    });
  };

  return (
    <Stack
      sx={{
        bgcolor: "white",
        position: "absolute",
        zIndex: "100",
        top: "69px",
        width: "100%",
      }}
    >
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <FTextField
          name="query"
          placeholder="Search a movie, tv show..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: (
              <Button type="submit" variant="contained">
                Search
              </Button>
            ),
          }}
        />
      </FormProvider>
    </Stack>
  );
}
