import React, { useRef, useEffect, useState } from 'react';
import {
	select,
	line,
	curveCardinal,
	scaleLinear,
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
			'background: #eee; overflow:visible; display:block; margin: 20px'
		);

		const xScale = scaleLinear()
			.domain([0, data.length - 1])
			.range([0, width]);

		const yScale = scaleLinear()
			.domain([0, Math.max(...data)])
			.range([height, 0]);
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

		const myLine = line()
			.x((value, index) => xScale(index))
			.y(yScale)
			.curve(curveCardinal);

		svg
			.attr('height', height)
			.attr('width', width)
			.selectAll('.line')
			.data([data])
			.join('path')
			.attr('class', 'line')
			.attr('d', (value) => myLine(value))
			.attr('fill', 'none')
			.attr('stroke', 'blue');
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
