import { fetchFilm } from "../../services";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Searchbar from "../../component/Searchbar/Searchbar ";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../component/Button/Button";
import s from "./MoviesPage.module.scss";
import def from "../../images/def.jpg";
export default function MoviesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [search, setSearch] = useState([]);
  const [page, setPage] = useState(1);
  const urlImg = "https://image.tmdb.org/t/p/w500";

  const handleFormSubmit = (name) => {
    setName(name);
    setSearch([]);
    setPage(1);
  };

  const onLoadMoreBtn = (e) => {
    setPage(page + 1, scrollPageToEnd());
    e.preventDefault();
  };

  const scrollPageToEnd = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 1000);
  };

  useEffect(() => {
    const urlSearch = new URLSearchParams(location.search).get("name");
    if (urlSearch) {
      setName(urlSearch);
    }
  }, [location.search]);

  useEffect(() => {
    if (!name) {
      setSearch(search);
      return;
    }

    fetchFilm(name, page)
      .then(({ results }) => {
        if (results.length === 0) {
          return toast.error(`We did not find ${name}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        navigate({ search: `name=${name}` });
        setSearch([...search, ...results]);
      })
      .catch((error) => alert(error.message));
  }, [name, page]);
  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <ToastContainer autoClose={4000} />
      <>
        {search && (
          <ul className={s.list}>
            {search.map((movie) => (
              <li key={movie.id} className={s.item}>
                <Link
                  to={{
                    pathname: `/movies/${movie.id}`,
                  }}
                  state={{ from: location, label: "Search" }}
                >
                  <img
                    className={s.img}
                    src={
                      movie.poster_path ? `${urlImg}${movie.poster_path}` : def
                    }
                    alt={movie.title}
                  />
                  <div className={s.wrapper}>
                    <p className={s.title}>{movie.title}</p>
                    <p className={s.text}>({movie.release_date})</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </>
      {search.length > 1 && <Button onSubmitPage={onLoadMoreBtn} />}
    </>
  );
}
