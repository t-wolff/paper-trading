import { NavLink } from "react-router-dom";

const NavListItem = ({ to, text, className }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={`${(isActive) => (isActive ? "active" : undefined)} ${
          className || ""
        }`}
      >
        {text}
      </NavLink>
    </li>
  );
};
export default NavListItem;
