
import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Footer = () => {
  return (
    <>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: "#123652",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Typography variant="body1">\m/</Typography>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
