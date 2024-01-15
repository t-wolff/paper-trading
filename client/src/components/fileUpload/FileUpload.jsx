import { useState } from 'react';
// import axios from "axios";
import * as actionAuth from '../../redux/Auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
function FileUpload() {
	const dispatch = useDispatch();
	const [file, setFile] = useState();
	const userContent = useSelector((state) => state.auth.userContent);
	const userId = userContent.userID;
	const handleFile = (e) => {
		setFile(e.target.files[0]);
	};
	const handleUpload = async () => {
		if (!file) {
			console.error('No file selected');
			return;
		}
		const formdata = new FormData();
		formdata.append('profilePic', file);
		formdata.append('userID', userId
        );
		try {
			dispatch(actionAuth.uploadPic(formdata));
		} catch (error) {
			console.error('Error uploading file:', error);
		}
	};


    
	return (
		<div className="file-container">
			<input type="file" onChange={handleFile} />
			<button onClick={handleUpload}>upload</button>
		</div>
	);
}
export default FileUpload;


