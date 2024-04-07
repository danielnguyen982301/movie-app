import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { MediaCardProps } from "../types";

type FavoriteContextType = {
  favoriteMovieList: MediaCardProps[];
  setFavoriteMovies: Dispatch<SetStateAction<string>>;

  favoriteTVList: MediaCardProps[];
  setFavoriteTVs: Dispatch<SetStateAction<string>>;
  toggleFavorite: (
    favoritelist: MediaCardProps[],
    setFavorite: Dispatch<SetStateAction<string>>,
    product: MediaCardProps
  ) => void;
};

export const FavoriteContext = createContext<FavoriteContextType>(null!);

export function FavoriteProvider({ children }: { children: ReactNode }) {
  const [favoriteMovies, setFavoriteMovies] = useState(
    () => window.localStorage.getItem("favoriteMovies") || "[]"
  );

  const [favoriteTVs, setFavoriteTVs] = useState(
    () => window.localStorage.getItem("favoriteTVs") || "[]"
  );

  const favoriteMovieList: MediaCardProps[] = JSON.parse(favoriteMovies);

  const favoriteTVList: MediaCardProps[] = JSON.parse(favoriteTVs);

  useEffect(() => {
    window.localStorage.setItem("favoriteMovies", favoriteMovies);
  }, [favoriteMovies]);

  useEffect(() => {
    window.localStorage.setItem("favoriteTVs", favoriteTVs);
  }, [favoriteTVs]);

  const toggleFavorite = (
    favoriteList: MediaCardProps[],
    setFavorite: Dispatch<SetStateAction<string>>,
    product: MediaCardProps
  ) => {
    if (favoriteList.some((item: MediaCardProps) => item.id === product.id)) {
      const newList = favoriteList.filter(
        (item: MediaCardProps) => item.id !== product.id
      );

      setFavorite(JSON.stringify(newList));
    } else {
      const newList = [...favoriteList, product];
      setFavorite(JSON.stringify(newList));
    }
  };

  return (
    <FavoriteContext.Provider
      value={{
        favoriteMovieList,
        setFavoriteMovies,
        favoriteTVList,
        setFavoriteTVs,
        toggleFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
