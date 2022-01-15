import { NavLink } from "react-router-dom";
import s from "./Navigation.module.scss";
const Navigation = () => {
  return (
    <header className={s.header}>
      <ul className={s.list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? s.active : s.link)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Movies"
            className={({ isActive }) => (isActive ? s.active : s.link)}
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </header>
  );
};
export default Navigation;
