import { createChart } from 'lightweight-charts';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { setMessageHandler, removeMessageHandler } from '../../ws/websocket';

const Graph = ({ data }) => {
	const chartContainerRef = useRef(null);

	useEffect(() => {
		if (chartContainerRef.current) {
			const chartOptions = {
				layout: { textColor: 'white', background: { type: 'solid', color: 'black' } },
			};

			const chart = createChart(chartContainerRef.current, chartOptions);

			const candlestickSeries = chart.addCandlestickSeries({
				upColor: '#01e4b3',
				downColor: '#ff2925',
				borderVisible: false,
				wickUpColor: '#26a69a',
				wickDownColor: '#ef5350',
			});

				candlestickSeries.setData(data);

				const updateCandle = (msg) => {
					if (chart) {
						candlestickSeries.update(msg);
					}
				};
				setMessageHandler(updateCandle);

				chart.timeScale().fitContent();
			

			return () => {
				if(chart) {
					removeMessageHandler(updateCandle);
					chart.remove();
				}
			};
		}
	}, [data]);

	return <div ref={chartContainerRef} style={{ width: '63%', height: '40rem' }} />;
};

Graph.propTypes = {
	data: PropTypes.array,
	
};

export default Graph;
