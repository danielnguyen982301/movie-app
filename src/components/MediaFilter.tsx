import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FMultiCheckbox } from "./form";
import apiService from "../app/apiService";

function MediaFilter({ type }: { type: string }) {
  const [genresOptions, setGenresOptions] = useState([]);

  useEffect(() => {
    const getGenresList = async () => {
      try {
        const res = await apiService.get(
          `/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}`
        );
        setGenresOptions(res.data.genres);
      } catch (err) {
        console.log(err);
      }
    };
    getGenresList();
  }, [type]);

  return (
    <Stack spacing={3} sx={{ p: 1 }}>
      <Stack spacing={1}>
        <Typography color="grey">Genres</Typography>
        <FMultiCheckbox
          name="genres"
          options={genresOptions}
          sx={{ width: 1 }}
        />
      </Stack>
    </Stack>
  );
}

export default MediaFilter;
