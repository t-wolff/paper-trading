import { useEffect, useState } from 'react';
import {
	openWebSocket,
	// sendWebSocketMessage,
	setMessageHandler,
} from '../../ws/websocket';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTrade from '../../redux/Trade/tradeSlice';
import './Trade.css';
import StyledButton from '../../components/styledButton/StyledButton';
import Input from '../../components/input/Input';

const Trade = () => {
	const dispatch = useDispatch();
	const [price, setPrice] = useState();
	const [product, setProduct] = useState('btc');
	const [quantity, setQuantity] = useState(0.001);
	const userContent = useSelector((state) => state.auth.userContent);
	const userId = userContent.userID;

	useEffect(() => {
		// Get all cookies as a string
		const allCookiesString = document.cookie;

		// Parse the string to get individual cookies
		const cookiesArray = allCookiesString.split(';');

		// Create an object to store key-value pairs of cookies
		const cookies = {};

		// Iterate through the array and populate the cookies object
		cookiesArray.forEach((cookie) => {
			const [name, value] = cookie.trim().split('=');
			cookies[name] = value;
		});

		// Now, you can access individual cookies using the cookies object
		const token = cookies.token;
		console.log('Token from cookies:', token);

		const connectToWebSocket = async () => {
			try {
				openWebSocket(
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI2YWNiYThmLTkxYjMtNDZlNC04MDZlLWRiOGU1OWRmZGM5MSIsImlhdCI6MTcwNDQwNzMyOCwiZXhwIjoxNzA2OTk5MzI4fQ.60AqIKyEXTSfckpOT8pToWyAC9MJRN0LfBW7fvwniMM'
				);
			} catch (error) {
				console.error('Error connecting to WebSocket:', error);
			}
		};

		// hardcoded for now need to change to dynamic rpoduct
		setProduct('btc');
		//

		const showClosePrice = (msg) => {
			const integerValue = parseFloat(msg.k.c, 10);
			setPrice(integerValue);
		};

		connectToWebSocket();
		setMessageHandler(showClosePrice);
	}, []);

	const handleBuy = async () => {
		dispatch(actionTrade.createTrade(product, 'BUY', quantity, userId));
	};

	const handleSell = async () => {
		dispatch(actionTrade.createTrade(product, 'SELL', quantity, userId));
	};

	const handleChangeInputs = (e) => {
		setQuantity(e.target.value);
	};

	return (
		<div>
			<h2>Trading Zone</h2>
			<h2>{product}</h2>
			<h2>{price}</h2>
			<Input
				name="quantity"
				label="QTY"
				type="string"
				handleChange={(e) => handleChangeInputs(e)}
				value={quantity}
			/>
			<StyledButton color={'green'} onclick={(e) => handleBuy(e)}>
				BUY
			</StyledButton>
			<StyledButton color={'red'} onclick={handleSell}>
				SELL
			</StyledButton>
		</div>
	);
};

export default Trade;
