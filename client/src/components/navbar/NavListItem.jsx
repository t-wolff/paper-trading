import { NavLink } from "react-router-dom";
import './Navbar.css';

const NavListItem = ({ to, text, className }) => {
  return (
    // <li className="navbar-link" >
      <NavLink
        to={to}
        className={`${(isActive) => (isActive ? "active" : "")} 
        ${className || ""} navbar-link`}
      >
        {text}
      </NavLink>
    // </li>
  );
};
export default NavListItem;
