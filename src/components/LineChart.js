import React, { useRef, useEffect, useState } from 'react';
import { select, line, curveCardinal } from 'd3';

function Circles() {
	const height = 200;
	const width = 250;
	const svgRef = useRef();
	const [data, setData] = useState([22, 38, 12, 76, 100]);

	const increase = () => {
		setData(data.map((d) => d + 5));
	};

	const filterCircle = () => {
		setData(data.filter((d) => d > 50));
	};

	useEffect(() => {
		const svg = select(svgRef.current).attr('style', 'background: #eee');
		const myLine = line()
			.x((value, index) => index * 50)
			.y((value) => height - value)
			.curve(curveCardinal);

		svg
			.attr('height', height)
			.attr('width', width)
			.selectAll('path')
			.data([data])
			.join('path')
			.attr('d', (value) => myLine(value))
			.attr('fill', 'none')
			.attr('stroke', 'blue');
	}, [data]);

	return (
		<>
			<svg ref={svgRef}></svg>
			<button onClick={increase}>Update</button>
			<button onClick={filterCircle}>Filter</button>
		</>
	);
}

export default Circles;
