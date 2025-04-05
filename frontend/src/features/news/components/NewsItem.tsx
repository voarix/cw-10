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
import { Link } from "react-router-dom";

interface Props {
  id: number | string;
  title: string;
  image: string | undefined;
  created_at: string;
  description?: string;
  fullView?: boolean;
}

const NewsItem: React.FC<Props> = ({
  id,
  title,
  image,
  created_at,
  description,
  fullView,
}) => {
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
    <>
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

            {fullView && description ? (
              <>
                <Typography variant="h5" sx={{ mt: 1 }}>
                  Content:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mt: 2,
                    wordBreak: "break-word",
                    lineHeight: 2,
                    opacity: 0.65,
                    fontStyle: "italic",
                    borderLeft: "3px solid #ccc",
                    pl: 2,
                  }}
                >
                  {description}
                </Typography>
              </>
            ) : (
              <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  component={Link}
                  to={`/news/${id}`}
                >
                  Read full post
                </Button>
                <Button variant="contained" size="small">
                  Delete
                </Button>
              </Box>
            )}
          </CardContent>
        </Box>
      </Card>
    </>
  );
};
export default NewsItem;
