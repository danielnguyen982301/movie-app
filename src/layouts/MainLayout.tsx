import { Stack } from "@mui/material";
import React, { useState } from "react";
import MainHeader from "./MainHeader";
import { Outlet } from "react-router-dom";
import MainFooter from "./MainFooter";

function MainLayout() {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <Stack onClick={() => setShowSearch(false)}>
      <MainHeader showSearch={showSearch} setShowSearch={setShowSearch} />
      <Outlet />
      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
