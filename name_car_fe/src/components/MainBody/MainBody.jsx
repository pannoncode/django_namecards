import React from "react";
import Box from "@mui/material/Box";


const styleBox = {
  // backgroundColor: "#5d5e61",
  minHeight: "90vh",
  width: "100%"
};

const MainBody = ({ children }) => {
  return <Box sx={styleBox}>{children}</Box>;
};

export default MainBody;
