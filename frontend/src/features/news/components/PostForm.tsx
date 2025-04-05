import Grid from "@mui/material/Grid2";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { INewsMutation } from "../../../types";
import FileInput from "../../../components/UI/FileInput.tsx";
import { productSchema } from "../../../zodSchemas/productsSchemas.ts";

interface Props {
  onSubmitNews: (news: INewsMutation) => void;
}

const PostForm: React.FC<Props> = ({ onSubmitNews }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      image: null,
    },
  });

  const onSubmit = (data: INewsMutation) => {
    onSubmitNews({ ...data });
  };

  const fileInputChangeHandler = (
    eFile: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { files } = eFile.target;

    if (files) {
      setValue("image", files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid size={{ sm: 12, md: 6, lg: 6 }}>
          <TextField
            style={{ width: "100%" }}
            id="title"
            label="Title"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        </Grid>

        <Grid size={{ sm: 12, md: 6, lg: 6 }}>
          <TextField
            style={{ width: "100%" }}
            multiline
            rows={3}
            id="description"
            label="Description"
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </Grid>

        <Grid size={{ sm: 12, md: 6, lg: 6 }}>
          <FileInput
            name="image"
            label="Image"
            onChange={fileInputChangeHandler}
            errors={!!errors.image}
            helperText={errors.image?.message}
          />
        </Grid>

        <Grid size={{ sm: 12, md: 6, lg: 6 }}>
          <Button
            style={{ width: "100%" }}
            type="submit"
            color="primary"
            variant="contained"
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PostForm;
