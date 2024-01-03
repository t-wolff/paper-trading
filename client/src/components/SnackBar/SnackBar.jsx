import { useDispatch, useSelector } from 'react-redux';
import * as actionSnackBar from '../../redux/SnackBar/snackBarSlice';
import './SnackBar.css';

export default function CustomizedSnackbars() {
	const dispatch = useDispatch();
	const snackBar = useSelector((state) => state.snackBar);

	const handleClose = () => {
		dispatch(actionSnackBar.disableSnackBar());
	};

	const snackbarClasses = `snackbar-container 
		${snackBar.visible ? '' : 'hide'} 
		${snackBar.type === 'error' ? 'snackbar-error' : ''}`;

	return (
		<div className={snackbarClasses}>
			<div>{snackBar.message}</div>
			<button
				onClick={handleClose}>
				X
			</button>
		</div>
	);
}
