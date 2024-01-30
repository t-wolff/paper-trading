import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { getFromLocalStorage } from '../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import * as actionAuth from '../redux/Auth/authSlice';

const ProtectedRoute = ({ children }) => {
	const navigate = useNavigate();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const dispatch = useDispatch();

	useEffect(() => {
		const localToken = getFromLocalStorage('TOKEN');
		try {
			if (localToken && !isAuthenticated) {
				dispatch(actionAuth.getUserContent(localToken));
			}
		} catch (error) {
			console.error('Error during authentication:', error);
		}

		if (!localToken && !isAuthenticated) {
			navigate('/');
		}
	}, [dispatch, navigate, isAuthenticated]);

	return isAuthenticated && children;
};

export default ProtectedRoute;

