import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavListItem from './NavListItem';
import Logo from '../../assets/logo-4.png';
import './Navbar.css';

const Navbar = ({color}) => {
	console.log(color);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	const navListItems = [
		{
			to: '/trade',
			text: 'Trade',
			className: null,
		},
		{
			to: '/dashboard',
			text: 'Dashboard',
			className: null,
		},
		{
			to: '/leaderboard',
			text: 'Leaderboard',
			className: null,
		},
	];

	return (
		<nav className={`navbar ${color}-navbar`}>
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

Navbar.propTypes = {
	color: PropTypes.string,
};

export default Navbar;
