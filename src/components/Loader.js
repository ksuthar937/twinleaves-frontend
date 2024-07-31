import { Box, Typography } from "@mui/material";
import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      my={8}
      py={2}
      justifyContent="center"
      gap={2}
    >
      <Typography variant="h6" component="h2">
        Loading...
      </Typography>
      <RotatingLines
        visible={true}
        height="46"
        width="46"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </Box>
  );
};

export default Loader;
