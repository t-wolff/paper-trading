import { useEffect } from 'react';
import FoxImage from '../../assets/fox.png';
import StyledButton from '../../components/styledButton/StyledButton';
import './Home.css';

const Home = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<section className="home-container">
			<header>
				<img src={FoxImage} alt="Fox" />
				<div>
					<h2>Start Creating <br /> Stories Now! </h2>
					<StyledButton color={'orange'}>Sign Up</StyledButton>
					<StyledButton color={'purple'}>Log in</StyledButton>
				</div>
			</header>
		</section>
	);
};

export default Home;
