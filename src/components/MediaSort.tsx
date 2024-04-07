import React from "react";
import { FSelect } from "./form";

const MOVIE_SORT_BY_OPTIONS = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.des", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "title.asc", label: "Title(A-Z)" },
  { value: "title.desc", label: "Title(Z-A)" },
];

const TV_SORT_BY_OPTIONS = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.des", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "first_air_date.desc",
    label: "First Air Date Descending",
  },
  { value: "first_air_date.asc", label: "First Air Date Ascending" },
  { value: "name.asc", label: "Name(A-Z)" },
  { value: "name.desc", label: "Name(Z-A)" },
];

function MediaSort({ type }: { type: string }) {
  const options = type === "movie" ? MOVIE_SORT_BY_OPTIONS : TV_SORT_BY_OPTIONS;
  return (
    <FSelect
      name="sortBy"
      size="small"
      sx={{
        "& .MuiInputBase-root.MuiOutlinedInput-root": {
          backgroundColor: "lightgrey",
          fontSize: "0.9rem",
        },
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </FSelect>
  );
}

export default MediaSort;
