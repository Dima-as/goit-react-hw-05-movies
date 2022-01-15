import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { fetchPopular } from "../../services";
import s from "./HomePage.module.scss";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const urlImg = "https://image.tmdb.org/t/p/w500";
  useEffect(() => {
    fetchPopular().then(({ results }) => {
      setMovies([...movies, ...results]);
    });
  }, []);
  return (
    <>
      <h1 className={s.title}>Trending today</h1>
      {movies && (
        <ul className={s.list}>
          {movies.map((movie) => (
            <li key={movie.id} className={s.item}>
              <NavLink to={`movies/${movie.id}`} state={{ from: "/" }}>
                <img
                  className={s.img}
                  src={`${urlImg}${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className={s.wrapper}>
                  <p className={s.subtitle}>{movie.title}</p>
                  <p className={s.text}>({movie.release_date})</p>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
