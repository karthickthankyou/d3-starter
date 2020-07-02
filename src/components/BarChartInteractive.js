import React, { useRef, useEffect, useState } from 'react'
import {
	select,
	line,
	curveCardinal,
	scaleLinear,
	scaleBand,
	axisBottom,
	axisRight,
} from 'd3'

function Circles() {
	const height = 200
	const width = 350
	const svgRef = useRef()
	const [data, setData] = useState([22, 38, 12, 76, 100, 112])

	const increase = () => {
		setData(data.map((d) => d + 5))
	}

	const filterCircle = () => {
		setData(data.filter((d) => d > 50))
	}

	const addData = () => {
		const newData = [...data, Math.floor(Math.random() * 100)]
		setData(newData)
	}

	useEffect(() => {
		const svg = select(svgRef.current).attr(
			'style',
			`background: #eee; overflow:visible; display:block; margin: 20px; height:${height}; width: ${width}`
		)

		const xScale = scaleBand()
			.domain(data.map((value, index) => index))
			.range([0, width])
			.padding(0.5)

		const yScale = scaleLinear()
			.domain([0, Math.max(...data)])
			.range([height, 0])

		const colorScale = scaleLinear()
			.domain([height, height / 2, height / 4])
			.range(['red', 'orange', 'green'])
			.clamp(true)

		const xAxis = axisBottom(xScale)
			.ticks(data.length)
			.tickFormat((index) => index + 1)
		svg
			.select('.xAxis')
			.style('transform', `translateY(${height}px)`)
			.call(xAxis)

		const yAxis = axisRight(yScale)
		svg
			.select('.yAxis')
			.style('transform', `translateX(${width}px)`)
			.call(yAxis)

		svg
			.selectAll('.bar')
			.data(data)
			.join('rect')
			.attr('class', 'bar')
			.attr('width', xScale.bandwidth())
			.attr('x', (d, i) => xScale(i))
			.on('mouseenter', (value, index) => {
				svg
					.selectAll('.tooltip')
					.data([value])
					.join((enter) => enter.append('text').attr('y', yScale(value)))
					.attr('class', 'tooltip')
					.attr('x', xScale(index) + xScale.bandwidth() / 2)
					.text(value)
					.attr('text-anchor', 'middle')
					.transition()
					.attr('opacity', 1)
					.attr('y', yScale(value) - 5)
			})
			.on('mouseleave', () => svg.select('.tooltip').remove())
			.transition()
			.attr('fill', colorScale)
			.attr('height', (value) => height - yScale(value))

			.attr('y', yScale)
	}, [data])

	return (
		<>
			<svg ref={svgRef}>
				<g className="xAxis"></g>
				<g className="yAxis"></g>
			</svg>
			<button onClick={increase}>Update</button>
			<button onClick={filterCircle}>Filter</button>
			<button onClick={addData}>Add Data</button>
		</>
	)
}

export default Circles
