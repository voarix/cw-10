import { useRef, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Button, TextField } from "@mui/material";
import React from "react";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  helperText?: string;
  errors?: boolean;
}

const FileInput: React.FC<Props> = ({
  onChange,
  name,
  label,
  helperText,
  errors = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState("");

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename("");
    }

    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        style={{ display: "none" }}
        type="file"
        name={name}
        onChange={onFileChange}
        ref={inputRef}
      />

      <Grid container spacing={2} alignItems="center">
        <Grid size={{ sm: 9}}>
          <TextField
            fullWidth
            disabled
            label={label}
            value={filename}
            onClick={activateInput}
            error={errors}
            helperText={helperText}
          />
        </Grid>
        <Grid size={{ sm: 3}} >
          <Button
            sx={{ height: '56px' }}
            variant="contained"
            onClick={activateInput}
            fullWidth
          >
            Browse
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;
