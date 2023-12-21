import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import axios from "axios";

const HomeScreen = () => {
  const [user, setUser] = useState();
  const token = sessionStorage.getItem("token");

  const checkLoggedUser = () => {
    axios
      .get("api/auth/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data["user"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    checkLoggedUser();
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          mt: "3rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: "white" }}>
          Üdvözöllek {user}
        </Typography>
      </Box>
    </>
  );
};

export default HomeScreen;
