import { Box, Container, Typography } from "@mui/material";
import React from "react";
import useAuth from "../hooks/useAuth";

function MainFooter() {
  const { user } = useAuth();
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        backgroundColor: "#031d33",
        justifyContent: "center",
      }}
    >
      <Box sx={{ display: "flex", color: "white", py: "80px" }}>
        <Box
          sx={{
            mr: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: 130,
              height: 94,
              backgroundImage: `url(https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg)`,
            }}
          ></Box>
          <Typography
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              color: `rgb(1,180,228)`,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Hi, {user?.username} !
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            {" "}
            THE BASICS
          </Typography>
          <Typography>About TMDB</Typography>
          <Typography>Contact Us</Typography>
          <Typography>Support Forums</Typography>
          <Typography>API</Typography>
          <Typography>System Status</Typography>
        </Box>
        <Box></Box>
        <Box></Box>
      </Box>
    </Container>
  );
}

export default MainFooter;
