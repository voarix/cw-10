import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { useEffect } from "react";
import { fetchAllNews } from "./newsThunks.ts";
import { selectNews, selectNewsLoading } from "./newsSlice.ts";
import Spinner from "../../components/UI/Spinner.tsx";
import Grid from "@mui/material/Grid2";
import NewsItem from "./components/NewsItem.tsx";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const News = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectNews);
  const newsFetchLoading = useAppSelector(selectNewsLoading);

  useEffect(() => {
    dispatch(fetchAllNews());
  }, [dispatch]);

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginTop: 5 }}
      >
        <Grid>
          <Typography variant="h4">News</Typography>
        </Grid>
        <Grid>
          <Button
            component={Link}
            to="/new-post"
            style={{ width: "100%" }}
            type="submit"
            color="primary"
            variant="contained"
          >
            Add new post
          </Button>
        </Grid>
      </Grid>

      {newsFetchLoading ? (
        <Spinner />
      ) : (
        <Grid container direction="row" spacing={1}>
          {news.map((post) => (
            <NewsItem
              key={post.id}
              id={post.id}
              title={post.title}
              image={post.image || undefined}
              created_at={post.created_at}
            />
          ))}
        </Grid>
      )}
    </>
  );
};

export default News;
