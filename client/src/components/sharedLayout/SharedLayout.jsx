import { Outlet } from 'react-router';
import { useLocation } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import './SharedLayout.css';

const SharedLayout = () => {
	const { pathname } = useLocation();
	let color;

	if (pathname === '/login' || pathname === '/signUp') {
		color = 'purple';
	} else {
		color = 'black';
	}

	return (
		<>
			<div>
				<Navbar color={color} />
				<div className={`outlet-container ${color}-outlet`}>
					<Outlet />
				</div>
				<footer className={`footer  ${color}-footer`}>
					<p>All Rights Reserved 2023</p>
				</footer>
			</div>
		</>
	);
};

export default SharedLayout;
