import PropTypes from "prop-types";
import s from "./Button.module.scss";
const Button = ({ onSubmitPage, ...allyProps }) => {
  return (
    <button
      className={s.button}
      type="submit"
      onClick={onSubmitPage}
      {...allyProps}
    >
      show more
    </button>
  );
};

Button.propTypes = {
  onSubmitPage: PropTypes.func.isRequired,
};
export default Button;
