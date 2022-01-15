import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../services";
import s from "./Reviews.module.scss";
const Reviews = () => {
  const { movieId } = useParams();
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    fetchReviews(movieId).then(setMovies);
  }, [movieId]);
  return (
    <>
      {movies && movies.total_results === 0 && (
        <h2>We don't have any reviews for this movie.</h2>
      )}
      {movies && (
        <ul>
          {movies.results.map((result) => (
            <li key={result.id} className={s.item}>
              <h2 className={s.title}>{result.author}</h2>
              <p className={s.text}>{result.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default Reviews;
