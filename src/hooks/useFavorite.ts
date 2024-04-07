import { useContext } from "react";
import { FavoriteContext } from "../contexts/FavoriteContext";

export default function useFavorite() {
  return useContext(FavoriteContext);
}
