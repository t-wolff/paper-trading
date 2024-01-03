import { useDispatch, useSelector } from 'react-redux';
import * as actionSnackBar from '../../redux/SnackBar/snackBarSlice';

export default function CustomizedSnackbars() {
	const dispatch = useDispatch();
	const snackBar = useSelector((state) => state.snackBar);

	const handleClose = (reason) => {
		if (reason === 'clickaway') {
			return;
		}
		dispatch(actionSnackBar.disableSnackBar());
	};

	return (
		<div className="snackbar-container" style={{ display: snackBar.visible ? 'block' : 'none', transition: 'height 400ms' }}>
			<div
				style={{
					backgroundColor: snackBar.type === 'error' ? 'red' : 'green',
					padding: '15px',
					color: 'white',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
				<div>{snackBar.message}</div>
				<button
					style={{
						background: 'none',
						border: 'none',
						cursor: 'pointer',
						color: 'white',
					}}
					onClick={handleClose}>
					Close
				</button>
			</div>
		</div>
	);
}
