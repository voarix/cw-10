import { Typography } from "@mui/material";
import PostForm from "../../features/news/components/PostForm.tsx";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../app/hooks.ts";
import { useNavigate } from "react-router-dom";
import { INewsMutation } from "../../types";
import { createNews } from "../../features/news/newsThunks.ts";
import BackHome from "../../components/UI/BackHome.tsx";

const NewPost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onCreateNewPost = async (newPost: INewsMutation) => {
    try {
      await dispatch(createNews(newPost)).unwrap();
      toast.success("Post was successfully created!");
      navigate("/");
    } catch (e) {
      toast.error("Post failed to create a new post!");
      console.error(e);
    }
  };

  return (
    <>
      <BackHome newPost/>

      <Typography
        variant="h4"
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        New Post
      </Typography>
      <PostForm onSubmitNews={onCreateNewPost} />
    </>
  );
};

export default NewPost;
