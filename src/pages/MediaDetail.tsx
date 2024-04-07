import {
  Box,
  Card,
  CardMedia,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../app/apiService";
import { Favorite } from "@mui/icons-material";
import useFavorite from "../hooks/useFavorite";
import { MediaCardProps } from "../types";

type Details = MediaCardProps & {
  genres: { name: string; id: number }[];
  runtime: number;
  tagline: string;
};

const initialDetails: Details = {
  backdrop_path: "",
  poster_path: "",
  release_date: "",
  first_air_date: "",
  genres: [{ name: "", id: 0 }],
  title: "",
  name: "",
  runtime: 0,
  vote_average: 0,
  tagline: "",
  overview: "",
  id: 0,
};

export default function MediaDetail() {
  const {
    toggleFavorite,
    setFavoriteMovies,
    setFavoriteTVs,
    favoriteMovieList,
    favoriteTVList,
  } = useFavorite();
  const { type, id } = useParams();
  const [details, setDetails] = useState(initialDetails);
  const releasedYear =
    details["release_date"] || details["first_air_date"]
      ? (details["release_date"] || details["first_air_date"]).substring(0, 4)
      : null;

  const isSetFavorite =
    favoriteMovieList.some((item) => item.id === details.id) ||
    favoriteTVList.some((item) => item.id === details.id);

  const handleFavorite = () => {
    if (type === "movie") {
      toggleFavorite(favoriteMovieList, setFavoriteMovies, details);
    } else {
      toggleFavorite(favoriteTVList, setFavoriteTVs, details);
    }
  };

  useEffect(() => {
    const getMediaDetail = async () => {
      try {
        const res = await apiService.get(
          `/${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}`
        );
        setDetails(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMediaDetail();
  }, [type, id]);

  return (
    <Card sx={{ width: "100%" }}>
      <CardMedia
        sx={{ height: "100vh", width: "100%" }}
        image={`https://image.tmdb.org/t/p/original${details["backdrop_path"]}`}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: `linear-gradient(rgba(32,32,53,0.8),rgba(32,32,53,0.8))`,
            width: "100%",
            height: "100%",
          }}
        >
          <Box display="flex" maxWidth="1300px" width="100%">
            <Box
              sx={{
                background: "black",
                height: 600,
                minWidth: 400,
              }}
            >
              <img
                style={{
                  height: "100%",
                  width: "100%",
                }}
                src={`https://image.tmdb.org/t/p/original${details["poster_path"]}`}
                alt={details.title || details.name}
              />
            </Box>

            <Stack p="30px" color="white" justifyContent="space-between">
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  {details.title || details.name}{" "}
                  {releasedYear ? `(${releasedYear})` : ""}
                </Typography>

                <Box pt={2}>
                  <Typography component="span">
                    {details["release_date"] || details["first_air_date"]}
                  </Typography>
                  {details.genres.length && (
                    <Typography
                      component="span"
                      sx={{
                        "&::before": {
                          content: `"•"`,
                          mx: 1,
                        },
                      }}
                    >
                      {details.genres
                        .map((genre, index) =>
                          index ? `, ${genre.name}` : genre.name
                        )
                        .join("")}
                    </Typography>
                  )}
                  {details.runtime && (
                    <span>
                      {Math.round(details.runtime / 60)}h {details.runtime % 60}
                      m
                    </span>
                  )}
                </Box>
              </Box>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    bgcolor: "darkmagenta",
                    color: "white",
                    borderRadius: "50%",
                    width: 55,
                    height: 55,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {details["vote_average"] ? (
                    <>
                      <Typography fontSize="1.5rem">
                        {Math.round(details["vote_average"] * 10)}
                      </Typography>
                      <sup style={{ fontSize: "0.7rem" }}>%</sup>
                    </>
                  ) : (
                    "NR"
                  )}
                </Box>
                <Typography width="30px" pl={1}>
                  User Score
                </Typography>
              </Box>

              <Tooltip
                title={
                  isSetFavorite ? "Unmark as Favorite" : "Mark as Favorite"
                }
              >
                <Box
                  sx={{
                    bgcolor: "black",
                    color: isSetFavorite ? "#FF00FF" : "white",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={handleFavorite}
                >
                  <Favorite />
                </Box>
              </Tooltip>

              <Box
                sx={{
                  color: "grey",
                  fontStyle: "italic",
                  fontWeight: "400",
                  fontSize: "1.1rem",
                }}
              >
                {details.tagline}
              </Box>
              <Box>
                <Typography fontSize="1.5rem" pt="10px">
                  Overview
                </Typography>
                <Typography pt="10px">{details.overview}</Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </CardMedia>
    </Card>
  );
}
