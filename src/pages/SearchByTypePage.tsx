import { Alert, Pagination, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import apiService from "../app/apiService";
import { MediaCardProps } from "../types";
import LoadingScreen from "../components/LoadingScreen";
import MediaCard from "../components/MediaCard";

export default function SearchByTypePage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const { type } = useParams();
  const mediaType = type ? type : "movie";
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getSearchResults = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          `/search/${mediaType}?page=${currentPage}&query=${
            query ? query : ""
          }&api_key=${process.env.REACT_APP_API_KEY}`
        );
        setSearchResults(res.data.results);
        setTotalPages(res.data["total_pages"]);
        setError("");
      } catch (err) {
        console.log(err);
        setError((err as Error).message);
      }
      setLoading(false);
    };
    getSearchResults();
  }, [currentPage, query, mediaType]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <Stack minWidth="1050px" pl="30px">
      {loading ? (
        <LoadingScreen />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : searchResults.length ? (
        <>
          <Stack>
            {searchResults.map((result: MediaCardProps) => (
              <MediaCard
                key={result.id}
                media={result}
                type={mediaType}
                isVertical={false}
              />
            ))}
          </Stack>
          <Stack spacing={2} alignItems="center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        </>
      ) : (
        <Typography>
          There are no {type === "movie" ? "movies" : "TV shows"} that matched
          your query.
        </Typography>
      )}
    </Stack>
  );
}
