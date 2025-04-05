import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectNewsLoading,
  selectOnePost,
} from "../../features/news/newsSlice.ts";
import NewsItem from "../../features/news/components/NewsItem.tsx";
import { fetchNewsById } from "../../features/news/newsThunks.ts";
import { useEffect } from "react";
import Spinner from "../../components/UI/Spinner.tsx";
import { Button } from "@mui/material";

const NewsFullView = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const newsItem = useAppSelector(selectOnePost);
  const loading = useAppSelector(selectNewsLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchNewsById(id.toString()));
    }
  }, [id, dispatch]);

  if (loading) {
    return <Spinner />;
  }

  if (!newsItem) {
    return <div>News not found</div>;
  }

  return (
    <>
      <Button
        variant="contained"
        sx={{ mt: 2, mb: 2, width: "100%" }}
        onClick={() => navigate("/")}
      >
        Back home
      </Button>
      {newsItem && (
        <NewsItem
          id={newsItem.id}
          title={newsItem.title}
          image={newsItem.image || undefined}
          created_at={newsItem.created_at}
          description={newsItem.description}
          fullView={true}
        />
      )}
    </>
  );
};

export default NewsFullView;
