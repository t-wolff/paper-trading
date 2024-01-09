import PropTypes from "prop-types";
import "./StyledButton.css";

const StyledButton = ({ color, onclick, children }) => {
  return (
    <button className={`styled-button ${color || ""}`} onClick={onclick || ""}>
      {children}
    </button>
  );
};

StyledButton.propTypes = {
	color: PropTypes.string,
	children: PropTypes.string,
	onclick: PropTypes.func,
};

export default StyledButton;
