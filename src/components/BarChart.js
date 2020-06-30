import React, { useRef, useEffect, useState } from 'react';
import {
	select,
	line,
	curveCardinal,
	scaleLinear,
	scaleBand,
	axisBottom,
	axisRight,
} from 'd3';

function Circles() {
	const height = 200;
	const width = 350;
	const svgRef = useRef();
	const [data, setData] = useState([22, 38, 12, 76, 100, 112]);

	const increase = () => {
		setData(data.map((d) => d + 5));
	};

	const filterCircle = () => {
		setData(data.filter((d) => d > 50));
	};

	useEffect(() => {
		const svg = select(svgRef.current).attr(
			'style',
			`background: #eee; overflow:visible; display:block; margin: 20px; height:${height}; width: ${width}`
		);

		const xScale = scaleBand()
			.domain(data.map((value, index) => index))
			.range([0, width])
			.padding(0.5);

		const yScale = scaleLinear()
			.domain([0, Math.max(...data)])
			.range([height, 0]);

		const colorScale = scaleLinear()
			.domain([height, height / 2, height / 4])
			.range(['red', 'orange', 'green'])
			.clamp(true);

		const xAxis = axisBottom(xScale)
			.ticks(data.length)
			.tickFormat((index) => index + 1);
		svg
			.select('.xAxis')
			.style('transform', `translateY(${height}px)`)
			.call(xAxis);

		const yAxis = axisRight(yScale);
		svg
			.select('.yAxis')
			.style('transform', `translateX(${width}px)`)
			.call(yAxis);

		svg
			.selectAll('.bar')
			.data(data)
			.join('rect')
			.transition()
			.attr('class', 'bar')
			.attr('fill', colorScale)
			.attr('width', xScale.bandwidth())
			.attr('height', (value) => height - yScale(value))
			.attr('x', (d, i) => xScale(i))
			.attr('y', yScale);
	}, [data]);

	return (
		<>
			<svg ref={svgRef}>
				<g className="xAxis"></g>
				<g className="yAxis"></g>
			</svg>
			<button onClick={increase}>Update</button>
			<button onClick={filterCircle}>Filter</button>
		</>
	);
}

export default Circles;
