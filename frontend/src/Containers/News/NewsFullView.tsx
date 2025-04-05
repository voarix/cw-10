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
  selectCommentsLoading, selectCreateLoading,
} from "../../features/comments/commentsSlice.ts";
import CommentItem from "../../features/comments/components/CommentItem.tsx";
import {
  createComment,
  deleteComment,
  fetchAllComments,
} from "../../features/comments/commentsThunks.ts";
import CommentForm, {
  CommentData,
} from "../../features/comments/components/CommentForm.tsx";

const NewsFullView = () => {
  const dispatch = useAppDispatch();
  const newsItem = useAppSelector(selectOnePost);
  const loading = useAppSelector(selectNewsLoading);
  const comments = useAppSelector(selectComments);
  const loadingComments = useAppSelector(selectCommentsLoading);
  const createCommentLoading = useAppSelector(selectCreateLoading);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchNewsById(id.toString()));
      dispatch(fetchAllComments());
    }
  }, [id, dispatch]);

  const onDeleteComment = async (commentId: number) => {
    if (window.confirm("Are you sure want to delete this comment?")) {
      await dispatch(deleteComment(commentId));
      dispatch(fetchAllComments());
    }
  };

  const onCommentSubmit = async (newComment: CommentData) => {
    if (id) {
      await dispatch(
        createComment({
          news_id: Number(id),
          author: newComment.author,
          description: newComment.description,
        }),
      );
    }

    dispatch(fetchAllComments());
  };

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

      <CommentForm onSubmit={onCommentSubmit} loading={createCommentLoading} />

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Comments:
        </Typography>
        {filteredComments.length > 0 ? (
          filteredComments.map((comment) => (
            <CommentItem
              key={comment.id}
              onDelete={onDeleteComment}
              deleteLoading={loadingComments}
              comment={comment}
            />
          ))
        ) : (
          <Typography sx={{ opacity: 0.5 }}>No comments</Typography>
        )}
      </Box>
    </>
  );
};

export default NewsFullView;
