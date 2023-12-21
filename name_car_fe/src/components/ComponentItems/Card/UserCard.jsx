import React, { useState } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import EditNameCardModal from "../Modal/EditNameCardModal";
import DeleteCardModal from "../Modal/DeleteCardModal";

const UserCard = ({
  image_option,
  name,
  job_title,
  email,
  index,
  id,
  refresh,
}) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    image_option: "",
    name: "",
    job_title: "",
    email: "",
  });
  const [deleteID, setDeleteID] = useState({
    id: "",
  });

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const handleOpenDeleteModal = () => setOpenDelete(true);
  const handleCloseDeleteModal = () => setOpenDelete(false);

  const handleEditData = () => {
    handleOpenModal();
    setEditData({
      id: id,
      image_option: image_option,
      name: name,
      job_title: job_title,
      email: email,
    });
  };

  const handleDeleteData = () => {
    handleOpenDeleteModal();
    setDeleteID({
      id: id,
    });
  };

  return (
    <>
      <EditNameCardModal
        open={open}
        onClose={handleCloseModal}
        onData={editData}
        refresh={refresh}
      />
      <DeleteCardModal
        open={openDelete}
        onClose={handleCloseDeleteModal}
        onData={deleteID}
        refresh={refresh}
      />
      <Card sx={{ width: 250, margin: "1rem" }} key={index}>
        <CardMedia
          sx={{ height: 140 }}
          image={`http://localhost:8000/${image_option}`}
          title={image_option}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {job_title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {email}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button size="small" onClick={handleEditData}>
            <EditIcon />
          </Button>
          <Button size="small" onClick={handleDeleteData}>
            <DeleteIcon />
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default UserCard;
