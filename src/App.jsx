import { useState, useMemo } from "react";
import Papa from "papaparse";
import { Chart as ChartJS } from "chart.js/auto";
import { Pie } from "react-chartjs-2";

function App() {
	const [stats, setStats] = useState({ lost: 0, won: 0, open: 0 });

	const handleFileUpload = (e) => {
		const file = e.target.files[0];
		Papa.parse(file, {
			header: true,
			complete: (results) => {
				const counts = { lost: 0, won: 0, open: 0 };
				results.data.forEach((row) => {
					counts[row.status] = counts[row.status] + 1 || 1;
				});
				setStats(counts);
			},
		});
	};

	const doughnutData = useMemo(() => {
		return {
			labels: [`LOST : ${stats.lost}`, `WON: ${stats.won}`, `OPEN: ${stats.open}`],
			datasets: [
				{
					label: "Deal Statistic",
					data: [stats.lost, stats.won, stats.open],
					backgroundColor: ["rgb(199, 4, 4)", "rgb(0, 209, 7)", "rgb(255, 255, 0)"],
					hoverOffset: 4,
				},
			],
		};
	}, [stats]);

	const options = {
		plugins: {
			legend: {
				labels: {
					color: "white",
				},
			},
		},
	};

	return (
		<div className=" flex flex-col items-center my-5 gap-5">
			<input type="file" accept=".csv" onChange={handleFileUpload} />
			<div className=" w-[280px] h-[280px] sm:w-[600px] sm:h-[600px] 2xl:w-[800px] 2xl:h-[800px]">
				{(stats.lost > 0 || stats.won > 0 || stats.open > 0) && <Pie data={doughnutData} options={options} />}
			</div>
		</div>
	);
}

export default App;
