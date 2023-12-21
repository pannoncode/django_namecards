import React, { useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import AlertModal from "../Modal/AlertModal";

import axios from "axios";
import { Link as route, useNavigate } from "react-router-dom";

const SignUp = () => {
  const userName = useRef();
  const userEmail = useRef();
  const userPassword = useRef();
  const navigate = useNavigate();

  const [titleForModal, setTitleForModal] = useState();
  const [contentForModal, setContentForModal] = useState();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);

  const handleSignUp = () => {
    let userData = {
      name: userName.current.value,
      email: userEmail.current.value,
      password: userPassword.current.value,
    };

    axios
      .post("api/sign-up/", userData)
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        setOpen(true);
        setTitleForModal("Sikertelen regisztráció");
        setContentForModal("A regisztráció nem sikerült, próbáld újra!");
      });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ backgroundColor: "white", marginTop: "1rem" }}
    >
      <AlertModal
        open={open}
        title={titleForModal}
        content={contentForModal}
        onClose={handleClose}
      />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Fiók regisztráció
        </Typography>
        <Box noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="Name"
                required
                fullWidth
                id="Name"
                label="Név"
                autoFocus
                inputRef={userName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email cím"
                name="email"
                autoComplete="email"
                inputRef={userEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Jelszó"
                type="password"
                id="password"
                autoComplete="new-password"
                inputRef={userPassword}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSignUp}
          >
            Regisztráció
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={route} to="/login" variant="body2">
                Van már fiókod? Lépj be!
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
