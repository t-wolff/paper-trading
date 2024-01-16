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
import Graph from '../../components/graph/Graph';

const Trade = () => {
	const dispatch = useDispatch();
	const [price, setPrice] = useState(0);
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

		// hardcoded for now need to change to dynamic product
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

	const initialData = [
		{ time: '2018-12-22', value: 32.51 },
		{ time: '2018-12-23', value: 31.11 },
		{ time: '2018-12-24', value: 27.02 },
		{ time: '2018-12-25', value: 27.32 },
		{ time: '2018-12-26', value: 25.17 },
		{ time: '2018-12-27', value: 28.89 },
		{ time: '2018-12-28', value: 25.46 },
		{ time: '2018-12-29', value: 23.92 },
		{ time: '2018-12-30', value: 22.68 },
		{ time: '2018-12-31', value: 22.67 },
	];

	function numberWithCommas(number) {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}
	return (
		<div className="trade-container">
			<div className="click-trade-container">
				<header>
					<h2 className="product-name">{product}</h2>
					<h2 className="product-price">{numberWithCommas(price)}$</h2>
				</header>
				<div className="trade-input-container">
					<h2>QTY</h2>
					<Input
						name="quantity"
						type="number"
						handleChange={(e) => handleChangeInputs(e)}
						value={quantity}
						width={'small'}
					/>
				</div>
				<div className="trade-btn-container">
					<StyledButton color={'green'} onclick={(e) => handleBuy(e)}>
						BUY
					</StyledButton>
					<StyledButton color={'red'} onclick={handleSell}>
						SELL
					</StyledButton>
				</div>
			</div>
			<Graph data={initialData} />
		</div>
	);
};

export default Trade;
