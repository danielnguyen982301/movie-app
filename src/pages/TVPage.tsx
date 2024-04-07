import {
  Alert,
  Box,
  Divider,
  Pagination,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormProvider } from "../components/form";
import MediaSort from "../components/MediaSort";
import MediaFilter from "../components/MediaFilter";
import { useForm } from "react-hook-form";
import apiService from "../app/apiService";
import { MediaCardProps } from "../types";
import LoadingScreen from "../components/LoadingScreen";
import MediaCard from "../components/MediaCard";

export default function TVPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mediaList, setMediaList] = useState<MediaCardProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  type InputValues = {
    genres: { name: string; id: string }[];
    sortBy: string;
  };

  const defaultValues = {
    genres: [],
    sortBy: "popularity.desc",
  };

  const methods = useForm<InputValues>({ defaultValues });
  const filterValues = methods.watch();
  console.log(filterValues);
  const genresQuery = filterValues.genres
    .map((genre, index) => (index ? `,${genre.id}` : `${genre.id}`))
    .join("");

  useEffect(() => {
    const getMediaList = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          `/discover/tv?page=${currentPage}&sort_by=${filterValues.sortBy}${
            genresQuery ? `&with_genres=${genresQuery}` : ""
          }&api_key=${process.env.REACT_APP_API_KEY}`
        );
        setMediaList(res.data.results);
        setTotalPages(res.data["total_pages"]);
        setError("");
      } catch (err) {
        console.log(err);
        setError((err as Error).message);
      }
      setLoading(false);
    };
    getMediaList();
  }, [currentPage, filterValues.sortBy, genresQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterValues.genres.length, filterValues.sortBy]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <Stack
      display="flex"
      flexDirection="row"
      p="35px"
      maxWidth="1300px"
      width="100%"
      justifyContent="center"
      mx="auto"
    >
      <FormProvider methods={methods}>
        <Stack>
          <Paper sx={{ border: "1px solid", p: 2, width: 260 }}>
            <Typography p={1} fontWeight="bold">
              {" "}
              Sort
            </Typography>
            <Divider />
            <Box>
              <Typography p={1} color="grey">
                Search results by
              </Typography>
              <MediaSort type="tv" />
            </Box>
          </Paper>
          <Paper sx={{ border: "1px solid", p: 2 }}>
            <Typography p={1} fontWeight="bold">
              Filter
            </Typography>
            <Divider />
            <Box>
              <MediaFilter type="tv" />
            </Box>
          </Paper>
        </Stack>
      </FormProvider>

      {loading ? (
        <LoadingScreen />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
        >
          <Box display="flex" flexWrap="wrap" pl="30px">
            {mediaList.map((media: MediaCardProps) => (
              <MediaCard key={media.id} media={media} type="tv" isVertical />
            ))}
          </Box>
          <Stack spacing={2} alignItems="center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        </Box>
      )}
    </Stack>
  );
}
