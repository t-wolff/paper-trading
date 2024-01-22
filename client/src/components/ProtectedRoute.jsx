import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getFromLocalStorage } from '../utils/constants';

const ProtectedRoute = ({ children }) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const navigate = useNavigate();

	getFromLocalStorage('token')
	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/');
		}
	}, [navigate, isAuthenticated]);

	return children;
};

export default ProtectedRoute;
