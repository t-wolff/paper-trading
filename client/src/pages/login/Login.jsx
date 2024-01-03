import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as actionAuth from '../../redux/Auth/authSlice';
import StyledButton from "../../components/styledButton/StyledButton";
import Input from "../../components/input/Input";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // const userContent = useSelector((state) => state.auth.userContent);
  const wrongCredentialsError = useSelector((state) => state.auth.wrongCredentialsError);

  const [form, setForm] = useState({
		email: '',
		password: '',
	});

  const [errs, setErrs] = useState({
		email: false,
		password: false,
	});



  const handleChangeInputs = (e) => {
    setErrs({...errs, [e.target.name]: false})
		dispatch(actionAuth.setWrongCredentialsError(''));
		setForm({ ...form, [e.target.name]: e.target.value });
	};

  const handleLogin = (e) => {
    e.preventDefault();
		if (form.email.length < 8 || form.password.length < 6) {
			if (form.email === '' || form.email.length < 8) {
				setErrs((prevErrs) => ({ ...prevErrs, email: true }));
			}
			if (form.password === '' || form.password.length < 6) {
				setErrs((prevErrs) => ({ ...prevErrs, password: true }));
			}
		} else {
			dispatch(actionAuth.login(form.email, form.password));
		}
	};

  if (isAuthenticated) {
		navigate('/dashboard;');
	}

  return (
		<div className="login-container">
			<div className="login-form-container">
				<h2>WELCOME</h2>
				<form>
					<Input
						name="email"
						label="Email"
						type="email"
						handleChange={(e) => handleChangeInputs(e)}
						error={errs.email && 'Please input valid email'}
						value={form.email}
					/>
					<Input
						name="password"
						label="Password"
						type="password"
						handleChange={(e) => handleChangeInputs(e)}
						error={errs.password && 'Please input valid password'}
						value={form.password}
					/>
					<StyledButton color="blue" onclick={handleLogin}>
						Login
					</StyledButton>
					<h6 className="credentials-err">{wrongCredentialsError}</h6>
				</form>
			</div>
		</div>
	);
};

export default Login;
