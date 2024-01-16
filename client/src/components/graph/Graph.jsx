import { createChart } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

const Graph = () => {
	const chartContainerRef = useRef(null);

useEffect(() => {
	if (chartContainerRef.current) {
		const chartOptions = {
			layout: { textColor: 'white', background: { type: 'solid', color: 'black' }},
		};
		const chart = createChart(chartContainerRef.current, chartOptions);
		const areaSeries = chart.addAreaSeries({
			lineColor: '#2962FF',
			topColor: '#2962FF',
			bottomColor: 'rgba(41, 98, 255, 0.28)',
		});
		areaSeries.setData([
			{ time: '2018-12-22', value: 32.51 },
		]);

		const candlestickSeries = chart.addCandlestickSeries({
			upColor: '#3dffec',
			downColor: '#ff2925',
			borderVisible: false,
			wickUpColor: '#26a69a',
			wickDownColor: '#ef5350',
		});
		candlestickSeries.setData([
			{ time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
			// ... rest of your candlestick series data
		]);

        chart.timeScale().fitContent();

        return () => {
					chart.remove();
				};
                
	}
}, []);

	return (
    <div ref={chartContainerRef} style={{ width: '50%', height: '20rem' }} />
    );
};

export default Graph;
