import { fetcMovieDetails } from "../../services";
import { useEffect, useState, Suspense } from "react";
import Reviews from "../Reviews/Reviews";
import def from "../../images/def.jpg";
import s from "./MovieDetailsPage.module.scss";
import Loaders from "../../component/Loader/Loader";
import Cast from "../Cast/Cast";

import {
  useParams,
  Routes,
  Route,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movies, setMovies] = useState(null);
  const urlImg = "https://image.tmdb.org/t/p/w500";

  const goBack = () => {
    if (
      location.pathname === `/movies/${movieId}/cast` ||
      location.pathname === `/movies/${movieId}/reviews`
    ) {
      return navigate(-2);
    }
    if (!location.state) {
      return navigate("/");
    }
    return navigate(-1);
  };

  useEffect(() => {
    fetcMovieDetails(movieId).then(setMovies);
  }, [movieId]);

  return (
    <>
      <button type="submit" className={s.button} onClick={goBack}>
        Go back
      </button>
      {movies && (
        <div className={s.container}>
          <img
            className={s.img}
            src={movies.poster_path ? `${urlImg}${movies.poster_path}` : def}
            alt={movies.title}
          />
          <div className={s.wrapper}>
            <h2 className={s.title}>
              {movies.title} ({movies.release_date})
            </h2>
            <p className={s.title}>Rating : {movies.vote_average}</p>
            <p className={s.title}>Overview</p>
            <p className={s.text}>{movies.overview}</p>
            <h2 className={s.text}>Genres:</h2>
            <ul className={s.list}>
              {movies.genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <ul className={s.navigation}>
        <li className={s.link}>
          <NavLink
            to={`/movies/${movieId}/cast`}
            className={({ isActive }) => (isActive ? s.active : s.link)}
          >
            Cast
          </NavLink>
        </li>
        <li className={s.link}>
          <NavLink
            to={`/movies/${movieId}/reviews`}
            className={({ isActive }) => (isActive ? s.active : s.link)}
          >
            Reviews
          </NavLink>
        </li>
      </ul>

      <div>
        <Suspense fallback={<Loaders />}>
          <Routes>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}
