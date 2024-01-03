import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
import './Navbar.css';

const NavListItem = ({ to, text, className }) => {
  return (
      <NavLink
        to={to}
        className={`${(isActive) => (isActive ? "active" : "")} 
        ${className || ""} navbar-link`}
      >
        {text}
      </NavLink>
  );
};

NavListItem.propTypes = {
	to: PropTypes.string,
	text: PropTypes.string,
	className: PropTypes.string,
};

export default NavListItem;
