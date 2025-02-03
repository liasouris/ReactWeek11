import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IJoke } from "../hooks/useJokes";

interface SavedPageProps {
  savedJokes: IJoke[];
  deleteJoke: (id: number) => void;
}

const SavedPage: React.FC<SavedPageProps> = ({ savedJokes, deleteJoke }) => {
  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h4" gutterBottom>
        Saved Jokes
      </Typography>

      {savedJokes.length === 0 ? (
        <Typography variant="h6">No saved jokes yet.</Typography>
      ) : (
        savedJokes.map((joke) => (
          <Card key={joke.id} sx={{ minWidth: 275, mt: 2, mx: "auto", maxWidth: 400 }}>
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
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteJoke(joke.id)}
              sx={{ mb: 2 }}
            >
              Delete Joke
            </Button>
          </Card>
        ))
      )}
    </Box>
  );
};

export default SavedPage;
