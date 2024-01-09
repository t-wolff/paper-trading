import { useEffect, useState } from 'react';
import {
	openWebSocket,
	// sendWebSocketMessage,
	setMessageHandler,
	// closeWebSocket,
} from '../../ws/websocket';
import './Trade.css';
import StyledButton from '../../components/styledButton/StyledButton';

const Trade = () => {
	const [price, setPrice] = useState();

	useEffect(() => {
		const connectToWebSocket = async () => {
			try {
				openWebSocket(
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI2YWNiYThmLTkxYjMtNDZlNC04MDZlLWRiOGU1OWRmZGM5MSIsImlhdCI6MTcwNDQwNzMyOCwiZXhwIjoxNzA2OTk5MzI4fQ.60AqIKyEXTSfckpOT8pToWyAC9MJRN0LfBW7fvwniMM'
				);
			} catch (error) {
				console.error('Error connecting to WebSocket:', error);
			}
		};

		const showClosePrice = (msg) => {
			const integerValue = parseFloat(msg.k.c, 10);
			setPrice(integerValue);
		};

		connectToWebSocket();
		setMessageHandler(showClosePrice);

		// Cleanup on component unmount
		return () => {
			// closeWebSocket();
		};
	}, []);

	return (
		<div>
			<h2>You have reached the dashboard</h2>
			<h2>{price}</h2>
			<StyledButton color={'green'} onclick={console.log('clicked')}>
				buy
			</StyledButton>
			<StyledButton color={'red'}>sell</StyledButton>
		</div>
	);
};

export default Trade;
