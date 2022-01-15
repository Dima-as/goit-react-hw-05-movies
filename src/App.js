import "./App.css";
import Navigation from "./component/Navigation/Navigation";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import NoteFoundPage from "./pages/NoteFoundPage/NoteFoundPage";
import MoviesPage from "./pages/MoviesPage/MoviesPage";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
        <Route path="*" element={<NoteFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
