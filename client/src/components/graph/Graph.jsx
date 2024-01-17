import { createChart } from 'lightweight-charts';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Graph = ({ data }) => {
	const chartContainerRef = useRef(null);

	useEffect(() => {
		if (chartContainerRef.current) {
			const chartOptions = {
				layout: { textColor: 'white', background: { type: 'solid', color: 'black' } },
			};
			const chart = createChart(chartContainerRef.current, chartOptions);

			// const priceSeries = chart.addLineSeries({
			// 	color: '#ef5350',
			// 	priceLineVisible: true,
			// 	lastValueVisible: true,
			// 	priceScaleId: 'right',
			// });
			// priceSeries.setData(data);

			const candlestickSeries = chart.addCandlestickSeries({
				upColor: '#01e4b3',
				downColor: '#ff2925',
				borderVisible: false,
				wickUpColor: '#26a69a',
				wickDownColor: '#ef5350',
			});

			candlestickSeries.setData(data);

			chart.timeScale().fitContent();

			return () => {
				chart.remove();
			};
		}
	}, []);

	return <div ref={chartContainerRef} style={{ width: '63%', height: '40rem' }} />;
};

Graph.propTypes = {
	data: PropTypes.array,
	
};

export default Graph;
