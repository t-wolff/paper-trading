import { useEffect } from 'react';
import StyledButton from '../../components/styledButton/StyledButton';
// import TradingPic from '../../assets/trading-graphic.png';
import './SignUp.css';

const SignUp = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const points = ["Sharpen your skills.",
					"Explore strategies. ",
					"Gain confidence risk-free."]

	return (
		<section className="home-container">
			<header>
				<div>
					<h2>Start Trading Now. </h2>
					{points.map(point => <h4>{point}</h4>)}
					<StyledButton color={'dark'}>Start Trading Now</StyledButton>
				</div>
				<img src={TradingPic} alt="" />
			</header>
		</section>
	);
};

export default SignUp;
