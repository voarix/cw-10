import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

export interface CommentData {
  author: string;
  description: string;
}

interface Props {
  onSubmit: (data: CommentData) => void;
  loading?: boolean;
}

const initialForm: CommentData = {
  author: "",
  description: "",
};

const CommentForm: React.FC<Props> = ({ onSubmit, loading = false }) => {
  const [form, setForm] = useState<CommentData>(initialForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.description.trim()) {
      onSubmit({
        author: form.author.trim() || "Anonymous",
        description: form.description.trim(),
      });

      setForm(initialForm);
    } else {
      alert("Please enter a description");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h6">Add a comment</Typography>

      <TextField
        name="author"
        label="Your name"
        value={form.author}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 1 }}
      />

      <TextField
        name="description"
        label="Your comment"
        value={form.description}
        onChange={handleChange}
        multiline
        rows={3}
        fullWidth
        required
      />

      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? "Loading..." : "Post Comment"}
      </Button>
    </Box>
  );
};

export default CommentForm;
