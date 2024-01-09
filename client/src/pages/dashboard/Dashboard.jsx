import { useEffect, useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
	const [trades, setTrades] = useState([]);

	useEffect(() => {
		getTrades()
	}, []);

	const getTrades = () => {
		console.log('trades')
		const res = ['lol', 'pop'];
		setTrades(res);
	}

	return (
		<div>
			<h2>You have reached the dashboard</h2>
			<ul>
				{trades.map((trade) => {
					<li>{trade}</li>;
				})}
			</ul>
			<h2>daily pnl</h2>
			<h2>weekly pnl</h2>
			<h2>monthly pnl</h2>
			<h2>balance</h2>
			<h2>leader-board place</h2>
		</div>
	);
};

export default Dashboard;
