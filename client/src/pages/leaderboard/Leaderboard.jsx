import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actionStats from '../../redux/Stats/statsSlice';
import avatar from '../../assets/user-avatar.png';

import './Leaderboard.css';

const BASE_URL =
	import.meta.env.VITE_MODE === 'prod'
		? import.meta.env.VITE_BASE_URL_PROD_PIC
		: import.meta.env.VITE_BASE_URL_PIC;


const Leaderboard = () => {
	const dispatch = useDispatch();
	const usersArr = useSelector((state) => state.stats.leaderboard);
	// const userContent = useSelector((state) => state.auth.userContent);
	// const stats = useSelector((state) => state.stats);
	// const userId = userContent.userID;

	useEffect(() => {
		dispatch(actionStats.getLeaderboard());
	}, [dispatch]);

	return (
		<div className="leaderboard-container">
			<ul>
				{usersArr.map((user) => {
					const imageUrl = user?.profilePic ? encodeURI(`${BASE_URL}${user?.profilePic}`) : null;
					return (
						<li key={user.firstName + user.lastName} className="leaderboard-row">
							<div className='leaderboard-titles'>
								<h2 className="position-num">{user.position}</h2>
								<img src={imageUrl || avatar} alt="profile-pic" className="profile-pic" />
								<h2 className="user-name">
									{user.firstName} {user.lastName}
								</h2>
							</div>
							<h2 className="user-pnl">{user.pnl}$</h2>
						</li>
					);
				})}
			</ul>

			<div className="leaderboard-data-container"></div>
		</div>
	);
};

export default Leaderboard;
