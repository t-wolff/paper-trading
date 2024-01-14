import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actionTrade from '../../redux/Trade/tradeSlice';
import './Dashboard.css';

const Dashboard = () => {
	const dispatch = useDispatch();
	// const [trades, setTrades] = useState([]);
	const tradeArr = useSelector((state) => state.trade.trades);
	const userContent = useSelector((state) => state.auth.userContent);
	const userId = userContent.userID;

	useEffect(() => {
		dispatch(actionTrade.getTrades(userId));
	}, []);

	// const getTrades = () => {
	// 	console.log('trades')
	// 	const res = ['lol', 'pop'];
	// 	setTrades(res);
	// }

	return (
		<div className="dashboard-container">
			<table className="trades-table">
				<tr className="trades-table-header">
					<th>Side</th>
					<th>Product</th>
					<th>QTY</th>
					<th>Price</th>
					<th>Nominal</th>
					<th>Creation Date</th>
				</tr>
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
			</table>
			<div className='dashboard-data-container'>
				<h2 className="dashboard-data">Daily pnl </h2>
				<h2 className="dashboard-data">Weekly pnl</h2>
				<h2 className="dashboard-data">Monthly pnl</h2>
				<h2 className="dashboard-data">Balance</h2>
				<h2 className="dashboard-data">Leader-board Place</h2>
			</div>
		</div>
	);
};

export default Dashboard;
