import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFromLocalStorage } from '../utils/constants';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
	const navigate = useNavigate();
	const userContent = useSelector((state) => state.auth.userContent);

	const token = getFromLocalStorage('TOKEN');

	useEffect(() => {
		if (!token) {
			navigate('/');
		}
	}, [navigate, token, userContent]);

	return children;
};

export default ProtectedRoute;
