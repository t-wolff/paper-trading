import * as actionAuth from '../../redux/Auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import './FileUpload.css';

function FileUpload() {
	const dispatch = useDispatch();
	const userContent = useSelector((state) => state.auth.userContent);
	const userId = userContent.userID;

	const handleUpload = async (e) => {
		const formdata = new FormData();
		formdata.append('profilePic', e.target.files[0]);
		formdata.append('userID', userId);

		try {
			dispatch(actionAuth.uploadPic(formdata));
		} catch (error) {
			console.error('Error uploading file:', error);
		}
	};

	const handleHeaderClick = () => {
		document.getElementById('fileInput').click();
	};

	return (
		<form encType="multipart/form-data">
			<input
				type="file"
				name="profilePic"
				id="fileInput"
				onChange={handleUpload}
				className="profile-pic-input"
			/>
			<div className="file-upload-btn" onClick={handleHeaderClick}>
				Upload Profile Pic
			</div>
		</form>
	);
}
export default FileUpload;
