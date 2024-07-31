import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { Box, Typography } from "@mui/material";

const Error = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      my={8}
      py={2}
      justifyContent="center"
      gap={1}
    >
      <ErrorIcon color="error" />
      <Typography variant="h6" component="h2">
        Oops! Something went wrong..
      </Typography>
    </Box>
  );
};

export default Error;
