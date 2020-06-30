import React, { useRef, useEffect, useState } from 'react';
import { select } from 'd3';

function Circles() {
	const svgRef = useRef();
	const [data, setData] = useState([20, 40, 60, 80, 100]);

	const increase = () => {
		console.log(data);

		setData(data.map((d) => d + 5));
	};

	const filterCircle = () => {
		setData(data.filter((d) => d > 50));
	};

	useEffect(() => {
		const svg = select(svgRef.current).attr('style', 'background: #eee');
		svg
			.attr('height', 300)
			.attr('width', 500)
			.selectAll('circle')
			.data(data)
			.join(
				(enter) => enter.append('circle'), // Can just use .join('circle)
				(update) => update.attr('class', 'updated'), // Useless in this case
				(exit) => exit.remove() // Useless in this case
			)
			.attr('r', (d) => d)
			.attr('cx', (d, i) => d * 3)
			.attr('cy', () => 100);
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
