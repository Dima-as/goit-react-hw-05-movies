import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImSearch } from "react-icons/im";
import s from "./Searchbar.module.scss";
import PropTypes from "prop-types";

export default function Searchbar({ onSubmit }) {
  const [name, setName] = useState("");

  const handleNameChange = (e) => {
    setName(e.currentTarget.value.toLowerCase());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      return toast.error(`We did not find ${name}`);
    }
    onSubmit(name);
    setName("");
  };

  return (
    <header>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          autoComplete="off"
          autoFocus
          type="text"
          name="name"
          placeholder="Search images and photos"
          onChange={handleNameChange}
          value={name}
          className={s.input}
        />
        <button type="submit" className={s.button}>
          <ImSearch style={{ marginRight: 8 }} />
          <span>Search</span>
        </button>
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
