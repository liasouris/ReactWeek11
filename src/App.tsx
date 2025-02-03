import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import FrontPage from "./components/FrontPage";
import SavedPage from "./components/SavedPage";
import useJokes from "./hooks/useJokes";
import "./App.css";

function App() {
  const { savedJokes, saveJoke, deleteJoke } = useJokes(); 
  
  return (
    <BrowserRouter>
      <Header />
      <div style={{ padding: "16px" }}>
        <Routes>
          <Route path="/" element={<FrontPage saveJoke={saveJoke} />} />
          <Route path="/saved" element={<SavedPage savedJokes={savedJokes} deleteJoke={deleteJoke} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
