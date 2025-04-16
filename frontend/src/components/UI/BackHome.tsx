import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";

interface Props {
  newPost?: boolean;
}

const BackHome: React.FC<Props>= ({newPost = false}) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      sx={
        newPost
          ? { sm: 12, md: 6, lg: 6 }
          : { mt: 2, mb: 2, width: "100%" }
      }      onClick={() => navigate("/")}
    >
      Back home
    </Button>
  );
};

export default BackHome;