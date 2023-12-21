import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";

const BeginingScreen = ({ onLogout }) => {
  useEffect(() => {
    onLogout(false);
  });
  return (
    <Box
      sx={{
        width: "100%",
        mt: "3rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" sx={{ color: "white" }}>
        Kérlek jelentkezz be!!
      </Typography>
    </Box>
  );
};

export default BeginingScreen;
