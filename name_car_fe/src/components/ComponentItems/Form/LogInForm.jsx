import React, { useRef } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

import axios from "axios";
import { useNavigate, Link as route } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
  const userEmail = useRef();
  const usePassword = useRef();
  const navigate = useNavigate();

  const handleLogin = async () => {
    // bejelentkezési adatok
    let userData = {
      email: userEmail.current.value,
      password: usePassword.current.value,
    };
    try {
      const response = await axios.post("/api/login/", userData);
      const token = response.data.access;

      //token tárolása
      sessionStorage.setItem("token", token);
      onLogin(true);

      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ backgroundColor: "white", padding: "1rem", marginTop: "4rem" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Bejelentkezés
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email cím"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={userEmail}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Jelszó"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={usePassword}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Bejelentkezés
          </Button>
        </Box>
        <Box sx={{ mt: "1rem", width:"100%", display: "flex", justifyContent: "right" }}>
          <Link component={route} to="/signup">
            Regisztráció
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
