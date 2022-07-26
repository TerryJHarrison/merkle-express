import {AppBar, Link, Toolbar, Typography} from "@mui/material";
import React from "react";

export const Header = () => {
  return (
    <>
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h2" sx={{flexGrow: 1}}>Merkle Express</Typography>
        <Typography variant="h5">by <Link href="https://www.linkedin.com/in/tjharrisonjr/" color="inherit">TJ Harrison</Link></Typography>
      </Toolbar>
    </AppBar>
    <Toolbar/>
    </>
  )
}

export default Header;