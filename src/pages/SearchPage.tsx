import { Box, MenuItem, MenuList, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Outlet,
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import apiService from "../app/apiService";

type Result = {
  name: string;
  category: string;
  totalResults: number;
};

const searchCategories = [
  {
    name: "Movies",
    category: "movie",
    totalResults: 0,
  },
  {
    name: "TV Shows",
    category: "tv",
    totalResults: 0,
  },
];

function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const { type } = useParams();
  const category = type ? type : "movie";
  const [searchResults, setSearchResults] =
    useState<Result[]>(searchCategories);

  useEffect(() => {
    const getQueryResults = () => {
      const promises = searchCategories.map(async (result: Result) => {
        try {
          const res = await apiService.get(
            `/search/${result.category}?query=${query ? query : ""}&api_key=${
              process.env.REACT_APP_API_KEY
            }`
          );

          return {
            ...result,
            totalResults: res.data["total_results"],
          };
        } catch (err) {
          console.log(err);
        }
      });
      Promise.all(promises).then((resolve) => {
        setSearchResults(resolve as Result[]);
      });
    };
    getQueryResults();
  }, [query]);

  const handleSearchCategory = (category: string) => {
    navigate({
      pathname: `/search/${category}`,
      search: `?${createSearchParams({ query: query ? query : "" })}`,
    });
  };

  return (
    <Stack alignItems="center">
      <Box
        maxWidth="1400px"
        p="30px 40px"
        alignItems="flex-start"
        display="flex"
      >
        <Box border="1px solid" minWidth="260px" borderRadius={3}>
          <Box bgcolor="#00CCFF" color="white" p={2} borderRadius={3}>
            <Typography fontWeight="bold">Search Results</Typography>
          </Box>
          <MenuList>
            {searchResults.map((result) => (
              <MenuItem
                key={result.name}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  bgcolor: result.category === category ? "lightgrey" : "",
                }}
                onClick={() => handleSearchCategory(result.category)}
              >
                <Typography
                  fontWeight={result.category === category ? "bold" : ""}
                >
                  {result.name}
                </Typography>
                <Typography
                  bgcolor={result.category === category ? "white" : "lightgray"}
                  borderRadius={3}
                  px="10px"
                >
                  {result.totalResults}
                </Typography>
              </MenuItem>
            ))}
          </MenuList>
        </Box>
        <Outlet />
      </Box>
    </Stack>
  );
}

export default SearchPage;
