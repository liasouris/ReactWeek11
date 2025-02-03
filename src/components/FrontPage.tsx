import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IJoke } from "../hooks/useJokes";
import { CircularProgress } from "@mui/material";

interface FrontPageProps {
  saveJoke?: (joke: IJoke) => boolean;
}

const FrontPage: React.FC<FrontPageProps> = ({ saveJoke }) => {
  const [joke, setJoke] = useState<IJoke | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchJoke = () => {
    setLoading(true);
    setError("");
  
    const controller = new AbortController();
    const signal = controller.signal;
  
    fetch("https://official-joke-api.appspot.com/random_joke", { signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch joke");
        }
        return response.json();
      })
      .then((data: IJoke) => {
        setJoke(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setError(err.message);
          setLoading(false);
        }
      });
  
    return () => controller.abort();
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <Box textAlign="center" mt={4}>
        <Typography variant="h4">Welcome to Joke Generator</Typography>
      <Button variant="contained" color="primary" onClick={fetchJoke}>
        Get Joke
      </Button>

      {loading ? (
        <Box mt={3}>
          <CircularProgress />
          <Typography variant="h6">Loading a joke...</Typography>
        </Box>
      ) : error ? (
        <Typography variant="h6" color="error" mt={3}>
          {error}
        </Typography>
      ) : (
        joke && (
          <Card sx={{ minWidth: 275, mt: 3, mx: "auto", maxWidth: 400 }}>
            <CardContent>
              <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
                Joke #{joke.id}
              </Typography>
              <Typography variant="h5" component="div">
                {joke.setup}
              </Typography>
              <Typography sx={{ color: "text.secondary", mt: 1 }}></Typography>
              <Typography variant="body2">{joke.punchline}</Typography>
            </CardContent>
          </Card>
        )
      )}
      {joke && saveJoke && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => saveJoke(joke)}
          sx={{ mt: 2 }}
        >
          Save Joke
        </Button>
      )}
    </Box>
  );
};

export default FrontPage;
