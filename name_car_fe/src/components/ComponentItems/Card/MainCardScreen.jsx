import React, { useState, useEffect } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import UserCard from "./UserCard";
import NewNameCardModal from "../Modal/NewNameCardModal";
import axios from "axios";

const MainCardScreen = () => {
  const [open, setOpen] = useState(false);
  const [nameCards, setNameCards] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const token = sessionStorage.getItem("token");

  const allNamecards = () => {
    axios
      .get("api-namecards/usercard/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        setNameCards(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const refreshNameCards = () => {
    allNamecards();
  };

  useEffect(() => {
    allNamecards();
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Box
          sx={{
            width: "100%",
            height: "5rem",
            backgroundColor: "#123652",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
            Névjegykártyák
          </Typography>
        </Box>
        <Box
          sx={{
            maxWidth: "100%",
            height: "3rem",
            backgroundColor: "#486C88",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{ backgroundColor: "#042036", color: "white" }}
            onClick={handleOpen}
          >
            Új névjegykártya
          </Button>
        </Box>
        <Container maxWidth="lg" sx={{ mt: "0.5rem" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {nameCards.map((data, index) => (
                <UserCard
                  key={index}
                  image_option={data.image_option}
                  name={data.name}
                  job_title={data.job_title}
                  email={data.email}
                  index={index}
                  id={data.id}
                  refresh={refreshNameCards}
                />
              ))}
            </Box>
          </Box>
        </Container>

        <NewNameCardModal
          open={open}
          onClose={handleClose}
          refresh={refreshNameCards}
        />
      </Container>
    </>
  );
};

export default MainCardScreen;
