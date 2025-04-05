import "./App.css";
import { Container, CssBaseline, Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import News from "./features/news/News.tsx";

const App = () => {
  return (
    <>
      <CssBaseline />
      <main>
        <Container maxWidth="xl" sx={{ mt: 5 }}>
          <Routes>
            <Route path="/" element={<News />} />
            <Route path="/news" element={<News />} />
            {/*<Route path="/new-post" element={</>}/>*/}
            <Route
              path="*"
              element={<Typography variant="h4">Not found page</Typography>}
            />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
