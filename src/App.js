import React, { useRef, useEffect, useState } from 'react';
import Circles from './components/Circles';
import LineChart from './components/LineChart';
import BarChart from './components/BarChart';
import BarChartInteractive from './components/BarChartInteractive';

function App() {
	return (
		<>
			{/* <Circles /> */}
			{/* <LineChart /> */}
			{/* <BarChart /> */}
			<BarChartInteractive />
		</>
	);
}

export default App;
