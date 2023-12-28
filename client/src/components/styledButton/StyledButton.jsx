import PropTypes from 'prop-types';
import './StyledButton.css';

const StyledButton = ({ color, children}) => {
	return <button className={`styled-button ${color ? color : ''}`}>{children}</button>;
};

StyledButton.propTypes = {
	color: PropTypes.string,
	children: PropTypes.string,
};

export default StyledButton;
