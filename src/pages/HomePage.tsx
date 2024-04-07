import {
  Alert,
  Box,
  Button,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FTextField, FormProvider } from "../components/form";
import { Search } from "@mui/icons-material";
import { MediaCardProps } from "../types";
import MediaCard from "../components/MediaCard";

type InputValues = {
  query: string;
};

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [trendTime, setTrendTime] = useState("day");
  const [trendList, setTrendList] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const methods = useForm<InputValues>({ defaultValues: { query: "" } });
  const onSubmit = (data: InputValues) => {
    navigate({
      pathname: "/search",
      search: `?${createSearchParams({ query: data.query })}`,
    });
  };

  useEffect(() => {
    const getTrendingList = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          `/trending/all/${trendTime}?api_key=${process.env.REACT_APP_API_KEY}`
        );
        setTrendList(res.data.results);
        setError("");
      } catch (err) {
        console.log(err);
        setError((err as Error).message);
      }
      setLoading(false);
    };
    getTrendingList();
  }, [trendTime]);

  return (
    <Stack sx={{ alignItems: "center" }}>
      <Box
        sx={{ maxWidth: "1300px", background: "#0f618a", p: 4, width: "100%" }}
      >
        <Typography variant="h3" color="white" fontWeight="bold">
          Welcome.
        </Typography>
        <Typography variant="h4" color="white">
          Millions of movies, TV shows, and people to discover. Explore now.
        </Typography>

        <Stack sx={{ bgcolor: "white", borderRadius: 8, my: 4 }}>
          <FormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <FTextField
              sx={{
                "& fieldset": { border: "none" },
              }}
              name="query"
              placeholder="Search a movie, tv show..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                endAdornment: (
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ borderRadius: 8, p: 2 }}
                  >
                    Search
                  </Button>
                ),
              }}
            />
          </FormProvider>
        </Stack>
      </Box>
      <Box
        sx={{
          backgroundImage: `url(https://www.themoviedb.org/assets/2/v4/misc/trending-bg-39afc2a5f77e31d469b25c187814c0a2efef225494c038098d62317d923f8415.svg)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50% 200px",
          maxWidth: "1300px",
          p: 4,
          width: "100%",
        }}
      >
        <Box display="flex">
          <Typography fontWeight="bold" variant="h5">
            Trending
          </Typography>
          <Box sx={{ borderRadius: 8, border: "1px solid", mx: 2 }}>
            {[
              { time: "day", name: "Today" },
              { time: "week", name: "This Week" },
            ].map((frame) => (
              <Button
                key={frame.name}
                size="small"
                onClick={() => setTrendTime(frame.time)}
                sx={{
                  "&:hover": {
                    bgcolor: "orange",
                  },
                  borderRadius: 8,
                  bgcolor: trendTime === frame.time ? "black" : "none",
                  color: trendTime === frame.time ? "lightseagreen" : "none",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                }}
              >
                {frame.name}
              </Button>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            my: 2,
            display: "flex",
            overflowX: "scroll",
            width: "100%",
          }}
        >
          {loading ? (
            <LoadingScreen />
          ) : error ? (
            <Alert severity="error"> {error}</Alert>
          ) : (
            trendList.map((item: MediaCardProps) => (
              <MediaCard
                isVertical
                key={item.id}
                media={item}
                type={item["media_type"]}
              />
            ))
          )}
        </Box>
      </Box>
    </Stack>
  );
}

export default HomePage;
