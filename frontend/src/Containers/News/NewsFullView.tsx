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
import { Box, Button, Typography } from "@mui/material";
import {
  selectComments,
  selectCommentsLoading,
} from "../../features/comments/commentsSlice.ts";
import CommentItem from "../../features/comments/components/CommentItem.tsx";
import { fetchAllComments } from "../../features/comments/commentsThunks.ts";

const NewsFullView = () => {
  const dispatch = useAppDispatch();
  const newsItem = useAppSelector(selectOnePost);
  const loading = useAppSelector(selectNewsLoading);
  const comments = useAppSelector(selectComments);
  const loadingComments = useAppSelector(selectCommentsLoading);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchNewsById(id.toString()));
      dispatch(fetchAllComments());
    }
  }, [id, dispatch]);

  if (loading || loadingComments) {
    return <Spinner />;
  }

  if (!newsItem) {
    return <div>News not found</div>;
  }

  const filteredComments = comments.filter(
    (comment) => comment.news_id === Number(id),
  );

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

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Comments:
        </Typography>
        {filteredComments.length > 0 ? (
          filteredComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        ) : (
          <Typography sx={{ opacity: 0.5 }}>No comments</Typography>
        )}
      </Box>
    </>
  );
};

export default NewsFullView;
