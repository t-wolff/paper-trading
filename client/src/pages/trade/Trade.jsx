import { useEffect, useState } from 'react';
import {
	openWebSocket,
	// sendWebSocketMessage,
	setMessageHandler,
} from '../../ws/websocket';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTrade from '../../redux/Trade/tradeSlice';
import StyledButton from '../../components/styledButton/StyledButton';
import Input from '../../components/input/Input';
import Graph from '../../components/graph/Graph';
import './Trade.css';
import { getFromLocalStorage } from '../../utils/constants';

const Trade = () => {
	const dispatch = useDispatch();
	const [price, setPrice] = useState(0);
	const [product, setProduct] = useState('btc');
	const [quantity, setQuantity] = useState(0.001);
	const [interval, setInterval] = useState('1d');
	const [timeFrame, setTimeFrame] = useState('1m');

	const candles = useSelector((state) => state.trade.candles);
	const userContent = useSelector((state) => state.auth.userContent);
	const userId = userContent.userID;

	const connectToWebSocket = async () => {
		try {
			const token = getFromLocalStorage('TOKEN');
			openWebSocket(token);
		} catch (error) {
			console.error('Error connecting to WebSocket:', error);
		}
	};

	const showClosePrice = (msg) => {
		const integerValue = parseFloat(msg.close, 10);
		setPrice(integerValue);
	};

	// const allCookiesString = document.cookie;
	// const cookiesArray = allCookiesString.split(';');
	// const cookies = {};
	// cookiesArray.forEach((cookie) => {
	// 	const [name, value] = cookie.trim().split('=');
	// 	cookies[name] = value;
	// });
	// const token = cookies.TOKEN;
	// console.log('Token from cookies:', token);

	useEffect(() => {
		connectToWebSocket();
		setMessageHandler(showClosePrice);
	}, []);

	useEffect(()=>{
		// hardcoded for now need to change to dynamic product
		setProduct('btc');
		setTimeFrame('1m');
		setInterval('1h');

		const candleParams = {
			interval,
			timeFrame,
			userID: userId,
			symbol: `${product.toUpperCase()}USDT`,
		};

		dispatch(actionTrade.getCandles(candleParams));
	}, [dispatch, userId])

	const handleBuy = async () => {
		dispatch(actionTrade.createTrade(product, 'BUY', quantity, userId));
	};

	const handleSell = async () => {
		dispatch(actionTrade.createTrade(product, 'SELL', quantity, userId));
	};

	const handleChangeInputs = (e) => {
		setQuantity(e.target.value);
	};

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
			<Graph data={candles} />
		</div>
	);
};

export default Trade;
