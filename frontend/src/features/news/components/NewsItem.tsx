import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

interface Props {
  title: string;
  image: string | undefined;
  created_at: string;
}

const NewsItem: React.FC<Props> = ({ title, image, created_at }) => {
  const formatDate = () => {
    const date = new Date(created_at);
    const now = new Date();

    const time = date.getTime();
    const nowTime = now.getTime();

    const timeDifference = nowTime - time;

    const millisecInDay = 86400000;
    const millisecInYear = 31536000000;

    if (timeDifference < millisecInDay) {
      return dayjs(created_at).format("HH:mm");
    } else if (timeDifference < 2 * millisecInYear) {
      return dayjs(created_at).format("DD | HH:mm");
    } else if (timeDifference < millisecInYear) {
      return dayjs(created_at).format("MM.DD | HH:mm");
    } else if (timeDifference > millisecInYear) {
      return dayjs(created_at).format("YYYY.MM.DD | HH:mm");
    }
  };

  return (
    <Card
      sx={{
        mt: 4,
        boxShadow: 3,
        borderRadius: 2,
        width: "100%",
        overflow: "hidden",
        display: "flex",
      }}
    >
      {image && (
        <Box
          sx={{
            width: 300,
            minWidth: 300,
            height: 200,
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            image={`http://localhost:8000/${image}`}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      )}

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardHeader
          title={
            <Typography variant="h5" fontWeight="bolder" color="primary">
              {title}
            </Typography>
          }
        />

        <CardContent sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ opacity: 0.65 }}>
            At: {formatDate()}
          </Typography>

          <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
            <Button variant="outlined" size="small">
              Read full post
            </Button>
            <Button variant="contained" size="small">
              Delete
            </Button>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};
export default NewsItem;
