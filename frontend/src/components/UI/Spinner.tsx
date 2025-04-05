import { Box, CircularProgress } from "@mui/material";

const Spinner = () => {
  return (
    <Box style={{ textAlign: "center" }}>
      <CircularProgress size="3rem" />
    </Box>
  );
};

export default Spinner;
