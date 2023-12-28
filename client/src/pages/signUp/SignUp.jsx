import { useEffect } from 'react';
import StyledButton from '../../components/styledButton/StyledButton';
// import TradingPic from '../../assets/trading-graphic.png';
import './SignUp.css';

const SignUp = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<section className="sign-up-container">
			<header>
				<div>
					<h2>Create Personal Account</h2>

					<StyledButton color={'dark'}>Start Trading Now</StyledButton>
				</div>
			</header>
		</section>
	);
};

export default SignUp;
