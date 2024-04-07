import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import SearchPage from "../pages/SearchPage";
import SearchByTypePage from "../pages/SearchByTypePage";
import MediaDetail from "../pages/MediaDetail";
import AuthRequire from "./AuthRequire";
import LoginPage from "../pages/LoginPage";
import FavoritePage from "../pages/FavoritePage";
import FavoriteByTypePage from "../pages/FavoriteByTypePage";
import MoviePage from "../pages/MoviePage";
import TVPage from "../pages/TVPage";

function Router() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />

        <Route path="movie" element={<MoviePage />} />
        <Route path="tv" element={<TVPage />} />

        <Route
          path="user/:username/favorite"
          element={
            <AuthRequire>
              <FavoritePage />
            </AuthRequire>
          }
        >
          <Route index element={<FavoriteByTypePage />} />
          <Route path=":favoriteType" element={<FavoriteByTypePage />} />
        </Route>
        <Route path="search" element={<SearchPage />}>
          <Route index element={<SearchByTypePage />} />
          <Route path=":type" element={<SearchByTypePage />} />
        </Route>
        <Route
          path=":type/:id"
          element={
            <AuthRequire>
              <MediaDetail />
            </AuthRequire>
          }
        />
      </Route>
    </Routes>
  );
}

export default Router;
