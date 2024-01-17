import { useState } from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const Input = ({ name, label, value, type, handleChange, error, width}) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleShowPassword = (e) => {
		e.preventDefault();
		setShowPassword(!showPassword);
	};

	return (
		<div className="input-group">
			<label htmlFor={name}>{label}</label>
			<div className="input-container">
				<input
					type={showPassword ? 'text' : type}
					name={name}
					value={value}
					onChange={handleChange}
					className={width}
				/>
				{type === 'password' && (
					<button onClick={(e) => handleShowPassword(e)} className="show-password-btn">
						{showPassword ? 'hide' : 'show'}
					</button>
				)}
			</div>
			<div className="error-message">{error}</div>
		</div>
	);
};

Input.propTypes = {
	name: PropTypes.string,
	width: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.any,
	type: PropTypes.string,
	handleChange: PropTypes.func.isRequired,
	error: PropTypes.bool,
};

export default Input;
