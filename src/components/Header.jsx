import React from "react";
import {AppBar, Link, Toolbar, Typography} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

export const Header = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  return (
    <>
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant={isSmallScreen ? "h4" : "h2"} sx={{flexGrow: 1}}>Merkle Express</Typography>
        <Typography variant={isSmallScreen ? "h7" : "h5"}>by <Link href="https://www.linkedin.com/in/tjharrisonjr/" color="inherit">TJ Harrison</Link></Typography>
      </Toolbar>
    </AppBar>
    <Toolbar/>
    </>
  )
}

export default Header;