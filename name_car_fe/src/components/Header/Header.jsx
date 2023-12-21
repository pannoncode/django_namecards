import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";

const drawerWidth = 240;

const Header = (props) => {
  const userIsAuth = props.userAuth;
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userAuth, setUserAuth] = useState();

  const isUserAuth = () => {
    const token = sessionStorage.getItem("token");
    return token != null;
  };

  useEffect(() => {
    setUserAuth(isUserAuth());
  }, [userAuth]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogOut = () => {
    sessionStorage.removeItem("token");
    setUserAuth(isUserAuth());
  };

  // Bejelentkezés menüpont elemei
  const loginNavItem = [
    <Button
      key={"Bejelentkezés"}
      sx={{ color: "#fff" }}
      component={Link}
      to="/login"
    >
      Bejelentkezés
    </Button>,
    <ListItem key={"Bejelentkezés"} disablePadding>
      <ListItemButton sx={{ textAlign: "center" }} component={Link} to="/login">
        <ListItemText primary={"Bejelentkezés"} />
      </ListItemButton>
    </ListItem>,
  ];

  // Kijelentkezés menüpont elemei
  const logOutNavItem = [
    <Button
      key={"logout"}
      sx={{ color: "#fff" }}
      onClick={handleLogOut}
      component={Link}
      to="/"
    >
      Kijelentkezés
    </Button>,
    <ListItem key={"logout"} disablePadding>
      <ListItemButton
        sx={{ textAlign: "center" }}
        onClick={handleLogOut}
        component={Link}
        to="/"
      >
        <ListItemText primary={"Kijelentkezés"} />
      </ListItemButton>
    </ListItem>,
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Névjegykártya
      </Typography>
      <Divider />
      <List>
        <ListItem key={"homescreen"} disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary={"Kezdőoldal"} />
          </ListItemButton>
        </ListItem>
        {/* Bejelentkezés / Kijelentkezés */}
        {userAuth ? logOutNavItem[1] : loginNavItem[1]}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "#042036" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Névjegykártya
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {userAuth || userIsAuth ? (
              <Button
                key={"homescreen"}
                sx={{ color: "#fff" }}
                component={Link}
                to="/home"
              >
                Kezdőoldal
              </Button>
            ) : (
              ""
            )}
            {userAuth || userIsAuth ? (
              <Button
                key={"usercards"}
                sx={{ color: "#fff" }}
                component={Link}
                to="/cards"
              >
                Névjegykártyák
              </Button>
            ) : (
              ""
            )}
            {/* Bejelentkezés / Kijelentkezés */}
            {userAuth || userIsAuth ? logOutNavItem[0] : loginNavItem[0]}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 0.5 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default Header;
