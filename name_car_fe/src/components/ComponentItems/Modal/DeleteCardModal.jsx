import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DeleteCardModal = ({ open, onClose, onData, refresh }) => {
  const token = sessionStorage.getItem("token");
  const handleDeleteNameCard = () => {
    axios
      .delete(`api-namecards/usercard/${onData["id"]}`, {
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

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Biztosan tölni szeretnéd?
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: "2rem",
            }}
          >
            <Box>
              <Button variant="contained" color="primary" onClick={onClose}>
                Nem
              </Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteNameCard}
              >
                Igen
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteCardModal;
