import { Link } from "react-router-dom";
import { useGlobalAuthContext } from "../../hooks";
import "./Navbar.css";
import NavListItem from "./NavListItem";

const Navbar = () => {
  const { currentUser } = useGlobalAuthContext();

  const navListItems = [

    {
      to: "/stories",
      text: "Stories",
      className: null,
    },
    {
      to: "/newStory",
      text: "Create a Story",
      className: null,
    },
    {
      to: currentUser ? "admin/manageArticles" : "admin",
      text: "Administration",
      className: null,
    },
  ];

  return (
    <nav className="navbar">
      <Link to="/">
        <div className="navbar-logo-container">
          <h2 className="navbar-logo">StorySphere</h2>
        </div>
      </Link>
      <ul className="nav-links">
        {navListItems.map((link) => (
          <NavListItem key={link.text} {...link} />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
