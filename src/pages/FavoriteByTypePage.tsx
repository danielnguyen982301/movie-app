import React from "react";
import useFavorite from "../hooks/useFavorite";
import { useParams } from "react-router-dom";
import MediaCard from "../components/MediaCard";

export default function FavoriteByTypePage() {
  const { favoriteMovieList, favoriteTVList } = useFavorite();
  const { favoriteType } = useParams();
  const favType = favoriteType ? favoriteType : "movie";

  return (
    <>
      {favType === "movie"
        ? favoriteMovieList.map((item) => (
            <MediaCard
              key={item.id}
              media={item}
              type={favType}
              isVertical={false}
            />
          ))
        : favoriteTVList.map((item) => (
            <MediaCard
              key={item.id}
              media={item}
              type={favType}
              isVertical={false}
            />
          ))}
    </>
  );
}
