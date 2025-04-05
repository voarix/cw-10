import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { IComment } from "../../../types";

interface Props {
  comment: IComment;
  deleteLoading?: boolean;
}

const CommentItem: React.FC<Props> = ({ comment, deleteLoading = false }) => {
  return (
    <Box
      sx={{
        mb: 2,
        border: "1px solid gray",
        padding: "1rem",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body1" component="div">
          <Typography component="span" fontWeight="bolder">
            {comment.author} wrote:
          </Typography>
          <Typography
            component="span"
            fontStyle="italic"
            sx={{ ml: 3, wordWrap: "break-word" }}
          >
            {comment.description}
          </Typography>
        </Typography>

        <Button
          variant="outlined"
          color="error"
          size="small"
          disabled={deleteLoading}
          sx={{ ml: 2 }}
        >
          {deleteLoading ? "Deleting..." : "Delete"}
        </Button>
      </Box>
    </Box>
  );
};

export default CommentItem;
