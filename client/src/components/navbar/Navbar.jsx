import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import NavListItem from "./NavListItem";
import Logo from '../../assets/logo-4.png';
import "./Navbar.css";

const Navbar = () => {
	const [isAuthenticated, userContent] = useSelector((state) => state.auth);

  const navListItems = [
    {
      to: "/trade",
      text: "Trade",
      className: null,
    },
    {
      to: "/dashboard",
      text: "Dashboard",
      className: null,
    },
    {
      to: "/leaderboard",
      text: "Leaderboard",
      className: null,
    },
  ];

  return (
		<nav className="navbar">
			<Link to="/">
				<div className="navbar-logo-container">
					<img className="navbar-logo" src={Logo} alt="logo" />
				</div>
			</Link>
			{isAuthenticated && (
				<>
					<div className="nav-links">
						{navListItems.map((link) => (
							<NavListItem key={link.text} {...link} />
						))}
						{/* <img
							src={encodeURI(
              encodeURI(`${NEW_UPLOADS_URL}uploads/${authUser?.avatar}`))}
							alt=""
						/>
						<button className="profile-btn">hello</button> */}
					</div>
				</>
			)}
		</nav>
	);
};

export default Navbar;
