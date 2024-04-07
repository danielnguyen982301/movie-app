import { Favorite, MoreHoriz } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFavorite from "../hooks/useFavorite";
import useAuth from "../hooks/useAuth";
import { MediaCardProps } from "../types";

export default function MediaCard({
  media,
  type,
  isVertical,
}: {
  media: MediaCardProps;
  type: string;
  isVertical: boolean;
}) {
  const {
    favoriteMovieList,
    favoriteTVList,
    setFavoriteMovies,
    setFavoriteTVs,
    toggleFavorite,
  } = useFavorite();

  const location = useLocation();
  const { user } = useAuth();
  const [anchorEl, setAncholEl] = useState<HTMLElement | null>(null);
  const date =
    media["first_air_date"] || media["release_date"]
      ? new Date(media["first_air_date"] || media["release_date"])
      : null;

  const navigate = useNavigate();

  const isSetFavorite =
    favoriteMovieList.some((item) => item.id === media.id) ||
    favoriteTVList.some((item) => item.id === media.id);

  const handleFavorite = () => {
    if (!user) {
      navigate("/login", { state: { from: location }, replace: true });
    } else {
      setAncholEl(null);
      if (type === "movie") {
        toggleFavorite(favoriteMovieList, setFavoriteMovies, media);
      } else {
        toggleFavorite(favoriteTVList, setFavoriteTVs, media);
      }
    }
  };

  return (
    <Card
      sx={
        isVertical
          ? {
              width: 150,
              minWidth: 150,
              overflow: "visible",
              cursor: "pointer",
              mr: 2.5,
              boxShadow: "none",
              background: "none",
            }
          : {
              position: "relative",
              mb: 2,
              height: 141,
              display: "flex",
              cursor: "pointer",
              boxShadow: "1px 1px 5px",
            }
      }
      onClick={() => navigate(`/${type}/${media.id}`)}
    >
      <CardMedia
        sx={
          isVertical
            ? {
                height: 225,
                width: "100%",
                borderRadius: 3,
                position: "relative",
              }
            : {
                height: 141,
                minWidth: 94,
                borderRadius: 3,
                position: "relative",
              }
        }
        image={
          media["poster_path"]
            ? `https://image.tmdb.org/t/p/original${media["poster_path"]}`
            : `https://clarionhealthcare.com/wp-content/uploads/2020/12/default-fallback-image.png`
        }
      >
        {isSetFavorite && (
          <Box
            sx={{
              position: "absolute",
              top: "2px",
              left: "2px",
              bgcolor: "black",
              color: "#FF00FF",
              width: "25px",
              height: "25px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Favorite />
          </Box>
        )}

        <Box sx={{ right: "2px", top: "2px", position: "absolute" }}>
          <Box
            sx={{
              opacity: "0.7",
              bgcolor: "white",
              borderRadius: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                bgcolor: "cyan",
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              setAncholEl(e.currentTarget);
            }}
          >
            <MoreHoriz />
          </Box>

          <Menu
            onClick={(e) => e.stopPropagation()}
            sx={{ mt: "30px" }}
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={() => setAncholEl(null)}
          >
            <MenuItem onClick={handleFavorite}>
              <Typography textAlign="center">
                {isSetFavorite ? "Remove Favorite" : "Add Favorite"}
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      </CardMedia>

      <CardContent sx={{ position: isVertical ? "relative" : "static" }}>
        {isVertical && (
          <Box
            sx={{
              bgcolor: "darkmagenta",
              color: "white",
              borderRadius: "50%",
              width: 34,
              height: 34,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: -19,
            }}
          >
            {media["vote_average"] ? (
              <>
                <Typography>
                  {Math.round(media["vote_average"] * 10)}
                  <sup style={{ fontSize: "0.5rem" }}>%</sup>
                </Typography>
              </>
            ) : (
              "NR"
            )}
          </Box>
        )}

        <Typography fontWeight="bold" sx={isVertical ? { mt: 2 } : {}}>
          {media.name || media.title}
        </Typography>
        {date && (
          <Typography color="grey">
            {date.toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Typography>
        )}
        {!isVertical && (
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              pt: "20px",
              display: "-webkit-box",
              "-webkit-line-clamp": "2",
              "-webkit-box-orient": "vertical",
            }}
          >
            {media.overview}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
