import { useEffect } from 'react';
import './Dashboard.css';
import { openWebSocket } from '../../ws/websocket';

const Dashboard = () => {
	useEffect(() => {
			openWebSocket('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI2YWNiYThmLTkxYjMtNDZlNC04MDZlLWRiOGU1OWRmZGM5MSIsImlhdCI6MTcwNDQwNzMyOCwiZXhwIjoxNzA2OTk5MzI4fQ.60AqIKyEXTSfckpOT8pToWyAC9MJRN0LfBW7fvwniMM')
		}, []);
	return (
		<div>
            <h2>you have reached the dashboard</h2>
		</div>
	);
};

export default Dashboard;
