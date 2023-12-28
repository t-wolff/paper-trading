import { useEffect } from 'react';
import StyledButton from '../../components/styledButton/StyledButton';
import TradingPic from '../../assets/trading-graphic.png';
import './Home.css';

const Home = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const points = ["Sharpen your skills.",
					"Explore strategies. ",
					"Gain confidence risk-free."]

	const handleSignUp = () => {
		
	}

	return (
		<section className="home-container">
			<header>
				<div>
					<h2>Start Trading Now. </h2>
					{points.map(point => <h4>{point}</h4>)}
					<StyledButton color={'dark'} onClick={handleSignUp}>Sign Up</StyledButton>
					<StyledButton color={'light'}>Log in</StyledButton>
				</div>
				<img src={TradingPic} alt="" />
			</header>
		</section>
	);
};

export default Home;
