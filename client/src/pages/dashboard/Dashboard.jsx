import { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actionTrade from '../../redux/Trade/tradeSlice';

import './Dashboard.css';

const Dashboard = () => {
	const dispatch = useDispatch();
	// const [trades, setTrades] = useState([]);
	// const tradeArr = useSelector((state) => state.trade.trades);
	const userContent = useSelector((state) => state.auth.userContent);
	const userId = userContent.userID;

	useEffect(() => {
		dispatch(actionTrade.getTrades(userId));
		// console.log(tradeArr);
	}, [userId, dispatch]);

	// const getTrades = () => {
	// 	console.log('trades')
	// 	const res = ['lol', 'pop'];
	// 	setTrades(res);
	// }

	return (
		<div>
			{/* <h2>You have reached the dashboard</h2>
			<ul>
				{tradeArr.map((trade) => {
					<li>{trade}</li>;
				})}
			</ul>
			<h2>daily pnl</h2>
			<h2>weekly pnl</h2>
			<h2>monthly pnl</h2>
			<h2>balance</h2>
			<h2>leader-board place</h2> */}
		</div>
	);
};

export default Dashboard;
