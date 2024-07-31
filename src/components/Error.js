import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { Box, Typography } from "@mui/material";
import { useProucts } from "../context/ProductsContext";

const Error = () => {
  const { state } = useProucts();

  return (
    <Box my={8} py={2}>
      <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
        <ErrorIcon color="error" />
        <Typography variant="h6" component="h2">
          Oops! Something went wrong..
        </Typography>
      </Box>
      <Typography variant="overline" component="h2">
        {state.error}
      </Typography>
      <Typography variant="body2" component="h2">
        Please try again after sometime!
      </Typography>
    </Box>
  );
};

export default Error;
