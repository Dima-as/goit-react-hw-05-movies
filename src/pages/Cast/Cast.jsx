import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCast } from "../../services";
import s from "./Cast.module.scss";
import def from "../../images/def.jpg";
export default function Cast() {
  const { movieId } = useParams();
  const [movies, setMovies] = useState(null);
  const urlImg = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    fetchCast(movieId).then(setMovies);
  }, [movieId]);
  return (
    <>
      {movies && (
        <ul className={s.list}>
          {movies.cast.map((cas) => (
            <li key={cas.id} className={s.item}>
              <img
                src={cas.profile_path ? `${urlImg}${cas.profile_path}` : def}
                alt={cas.name}
                className={s.img}
              />
              <div className={s.wrapper}>
                <p className={s.title}>{cas.name}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
