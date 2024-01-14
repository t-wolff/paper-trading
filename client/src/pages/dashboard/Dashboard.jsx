import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actionTrade from '../../redux/Trade/tradeSlice';
import * as actionStats from '../../redux/Stats/statsSlice';
import './Dashboard.css';

const Dashboard = () => {
	const dispatch = useDispatch();
	const tradeArr = useSelector((state) => state.trade.trades);
	const userContent = useSelector((state) => state.auth.userContent);
	const stats = useSelector((state) => state.stats);
	const userId = userContent.userID;

	useEffect(() => {
		dispatch(actionTrade.getTrades(userId));
		dispatch(actionStats.getStats(userId));
	}, [userId]);

	return (
		<div className="dashboard-container">
			<table className="trades-table">
				<thead>
					<tr className="trades-table-header">
						<th>Side</th>
						<th>Product</th>
						<th>QTY</th>
						<th>Price</th>
						<th>Nominal</th>
						<th>Creation Date</th>
					</tr>
				</thead>
				<tbody>
					{tradeArr.map((trade) => {
						return (
							<tr key={trade.tradeID} className="trades-table-row">
								<td className={trade.side === 'BUY' ? 'green-side' : 'red-side'}>{trade.side}</td>
								<td>{trade.productName}</td>
								<td>{trade.quantity}</td>
								<td>{trade.price}</td>
								<td>{trade.nominal}</td>
								<td>{trade.createdAt}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className="dashboard-data-container">
				<h2 className="dashboard-data">PNL : {stats.pnl}</h2>
				{/* <h2 className="dashboard-data">Weekly PNL : {stats}</h2> */}
				{/* <h2 className="dashboard-data">Monthly PNL : {stats}</h2> */}
				<h2 className="dashboard-data">USD Balance : {stats.usdtBalance}</h2>
				<h2 className="dashboard-data">BTC Balance : {stats.productBalance}</h2>
				<h2 className="dashboard-data">LeaderBoard : </h2>
			</div>
		</div>
	);
};

export default Dashboard;
