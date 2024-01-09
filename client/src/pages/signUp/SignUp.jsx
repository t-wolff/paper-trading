import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actionAuth from '../../redux/Auth/authSlice';
import StyledButton from '../../components/styledButton/StyledButton';
import Input from '../../components/input/Input';

import './SignUp.css';

const SignUp = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isRegistered = useSelector((state) => state.auth.isRegistered);

	const [form, setForm] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});

	const [errs, setErrs] = useState({
		firstName: false,
		lastName: false,
		email: false,
		password: false,
	});

	const handleChangeInputs = (e) => {
		setErrs({ ...errs, [e.target.name]: false });
		dispatch(actionAuth.setWrongCredentialsError(''));
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleRegister = (e) => {
		e.preventDefault();
		if (
			form.email.length < 8 ||
			form.password.length < 6 ||
			form.firstName.length < 2 ||
			form.lastName.length < 2
		) {
			if (form.email.length < 8) {
				setErrs((prevErrs) => ({ ...prevErrs, email: true }));
			}
			if (form.password.length < 6) {
				setErrs((prevErrs) => ({ ...prevErrs, password: true }));
			}
			if (form.firstName.length < 2) {
				setErrs((prevErrs) => ({ ...prevErrs, firstName: true }));
			}
			if (form.lastName.length < 2) {
				setErrs((prevErrs) => ({ ...prevErrs, lastName: true }));
			}
		} else {
			dispatch(actionAuth.register(form.firstName, form.lastName, form.email, form.password));
		}
	};

	if (isRegistered) {
		navigate('/login');
		dispatch(actionAuth.setIsRegistered(false));
	}

	return (
		<div className="signup-container">
			<div className="signup-form-container">
				<h2>JOIN OUR TEAM</h2>
				<form>
					<Input
						name="firstName"
						label="First Name"
						type="text"
						handleChange={(e) => handleChangeInputs(e)}
						error={errs.firstName && 'Please input a valid name'}
						value={form.firstName}
					/>
					<Input
						name="lastName"
						label="Last Name"
						type="text"
						handleChange={(e) => handleChangeInputs(e)}
						error={errs.lastName && 'Please input a valid last name'}
						value={form.lastName}
					/>
					<Input
						name="email"
						label="Email"
						type="email"
						handleChange={(e) => handleChangeInputs(e)}
						error={errs.email && 'Please input a valid email'}
						value={form.email}
					/>
					<Input
						name="password"
						label="Password"
						type="password"
						handleChange={(e) => handleChangeInputs(e)}
						error={errs.password && 'Please input a valid password'}
						value={form.password}
					/>
					<StyledButton color="light" onclick={handleRegister}>
						Start Trading Now !
					</StyledButton>
					<div className="login-link-container">
						<h6>Already have an account?</h6>
						<Link to="/login">
							<h6 className="login-link">Log In</h6>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
