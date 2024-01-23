import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actionAuth from '../../redux/Auth/authSlice';
import FileUpload from '../fileUpload/FileUpload';
import './ProfilePic.css';

const BASE_URL =
	import.meta.env.VITE_MODE === 'production'
		? import.meta.env.VITE_BASE_URL_PROD_PIC
		: import.meta.env.VITE_BASE_URL_PIC;


const ProfilePic = () => {
	const dispatch = useDispatch();
	const userContent = useSelector((state) => state.auth.userContent);

	const [openProfileModal, setOpenProfileModal] = useState(false);

	const handleProfileClick = () => {
		setOpenProfileModal(!openProfileModal);
	};

	// const handleProfileClose = () => {
    //     if (openProfileModal) {setOpenProfileModal(false)}
	// };

	const handleLogout = () => {
		dispatch(actionAuth.logout());
		console.log('logout');
	};

	const imageUrl = userContent?.profilePic
		? encodeURI(`${BASE_URL}${
				userContent?.profilePic}`)
		: '../../assets/user-avatar.png';

	return (
		<div className="profile-pic-container">
			<div className="profile-avatar" onClick={handleProfileClick}>
				<img src={imageUrl} alt="avatar" className='profile-pic' />
			</div>
			<div className={`profile-pic-modal ${openProfileModal === true ? '' : 'hide'}`}>
				<h4 onClick={handleLogout} className="profile-logout">
					Log-Out
				</h4>
				<FileUpload />
			</div>
			{/* <div className="overlay" onClick={handleProfileClose}></div> */}
		</div>
	);
};

export default ProfilePic;
