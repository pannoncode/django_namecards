import React, { useRef, useState, useEffect } from "react";

import axios from "axios";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const texfieldStyle = {
  mt: 1,
  width: "30rem",
};

const EditNameCardModal = ({ open, onClose, onData, refresh }) => {
  const userName = useRef();
  const userJob = useRef();
  const userEmail = useRef();
  const [options, setOptions] = useState([]);
  const [avatar, setAvatar] = useState("");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    axios
      .get("api-namecards/avatar/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setOptions(response.data);
      })
      .catch((error) => {
        console.error("Hiba történt a lekérés során", error);
      });
  }, []);

  const handleSendNewCardData = () => {
    let nameCardData = {
      image_option: avatar,
      name: userName.current.value,
      job_title: userJob.current.value,
      email: userEmail.current.value,
    };

    axios
      .patch(`api-namecards/usercard/${onData["id"]}`, nameCardData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        refresh();
      })
      .catch((err) => {
        console.log(err);
      });
    onClose();
  };

  const handleChange = (event) => {
    setAvatar(event.target.value);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Container
          component="main"
          sx={{ backgroundColor: "white", padding: "1rem", width: "100%" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h4" variant="h5">
              Szerkesztés
            </Typography>
            <Box sx={texfieldStyle}>
              <FormControl fullWidth>
                <InputLabel id="avatar-select-label">Avatar</InputLabel>
                <Select
                  labelId="avatar-select-label"
                  id="avatar-select"
                  value={onData["image_option"]}
                  label="Avatar"
                  onChange={handleChange}
                >
                  {options.map((option, index) => (
                    <MenuItem key={index} value={option[0]}>
                      {option[1]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={texfieldStyle}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Név:"
                name="name"
                autoComplete="név"
                autoFocus
                defaultValue={onData["name"]}
                inputRef={userName}
              />
            </Box>
            <Box sx={texfieldStyle}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="job_title"
                label="Beosztás:"
                name="job_title"
                autoComplete="Beosztás"
                autoFocus
                defaultValue={onData["job_title"]}
                inputRef={userJob}
              />
            </Box>
            <Box sx={texfieldStyle}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email:"
                name="email"
                autoComplete="email"
                autoFocus
                defaultValue={onData["email"]}
                inputRef={userEmail}
              />
            </Box>
            <Box sx={{ mt: "1rem" }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#042036" }}
                onClick={handleSendNewCardData}
              >
                Mentés
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Modal>
  );
};

export default EditNameCardModal;
