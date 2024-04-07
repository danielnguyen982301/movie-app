import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import useFavorite from "../hooks/useFavorite";
import { Outlet, useNavigate } from "react-router-dom";

export default function FavoritePage() {
  const [currentTab, setCurrentTab] = useState("movie");
  const { user } = useAuth();
  const { favoriteMovieList, favoriteTVList } = useFavorite();
  const navigate = useNavigate();
  return (
    <Stack alignItems="center">
      <Container
        maxWidth={false}
        sx={{
          background: `radial-gradient(at 30% top, #031d33 0%, rgba(3,37,65,1) 70%)`,
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          sx={{
            backgroundImage:
              "url(https://www.themoviedb.org/assets/2/v4/account_pipes/green-79a9507a08a7e5a9b8c643a69026fe46191c45972cb45b944ab4b5f8a9110b03.svg)",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            p="40px"
            maxWidth="1300px"
            width="100%"
          >
            <Avatar
              sx={{
                bgcolor: "rgb(1,210,119)",
                width: 150,
                height: 150,
                fontSize: "4rem",
              }}
              alt={user?.username.toUpperCase()}
              src="random.jpg"
            />
            <Typography variant="h4" fontWeight="bold" color="white" pl="30px">
              {user?.username}
            </Typography>
          </Box>
        </Box>
      </Container>

      <Box maxWidth="1300px" width="100%" p="40px">
        <Box display="flex" alignItems="center">
          <Typography variant="h4" fontWeight="bold">
            My Favorites
          </Typography>
          <Typography
            sx={{
              mx: 2,
              cursor: "pointer",
              borderBottom: currentTab === "movie" ? "3px solid green" : "none",
            }}
            onClick={() => {
              navigate(`/user/${user?.username}/favorite/movie`);
              setCurrentTab("movie");
            }}
          >
            Movies{" "}
            <Typography
              component="span"
              style={{ color: "green", fontSize: "0.9rem" }}
            >
              {favoriteMovieList.length}
            </Typography>
          </Typography>

          <Typography
            sx={{
              cursor: "pointer",
              borderBottom: currentTab === "tv" ? "3px solid green" : "none",
            }}
            onClick={() => {
              navigate(`/user/${user?.username}/favorite/tv`);
              setCurrentTab("tv");
            }}
          >
            TV{" "}
            <Typography
              component="span"
              style={{ color: "green", fontSize: "0.9rem" }}
            >
              {favoriteTVList.length}
            </Typography>
          </Typography>
        </Box>
        <Stack mt={2}>
          <Outlet />
        </Stack>
      </Box>
    </Stack>
  );
}
