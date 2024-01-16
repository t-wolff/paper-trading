import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actionStats from '../../redux/Stats/statsSlice';
import './Leaderboard.css';

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
			<table className="trades-table">
				{/* <thead>
					<tr className="trades-table-header">
						<th>Side</th>
						<th>Product</th>
						<th>QTY</th>
						<th>Price</th>
						<th>Nominal</th>
						<th>Creation Date</th>
					</tr>
				</thead> */}
				<tbody>
					{usersArr.map((user) => {
						return (
							<tr key={user.firstName+user.lastName} className="users-table-row">
								<td>{user.position}</td>
								<td>{user.firstName}</td>
								<td>{user.lastName}</td>
								<td>{user.pnl}$</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className="leaderboard-data-container">
				
			</div>
		</div>
	);
};

export default Leaderboard;
