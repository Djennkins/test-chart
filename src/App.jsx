import { useState } from "react";
import Papa from "papaparse";
import { Chart as ChartJS } from "chart.js/auto";
import { Pie } from "react-chartjs-2";

function App() {
	const [data, setData] = useState([]);
	const [lost, setLost] = useState([]);
	const [won, setWon] = useState([]);
	const [open, setOpen] = useState([]);

	const handleFileUpload = (e) => {
		const file = e.target.files[0];
		Papa.parse(file, {
			header: true,
			complete: (results) => {
				setData(results.data);
				setLost(results.data.filter((row) => row.status === "lost"));
				setWon(results.data.filter((row) => row.status === "won"));
				setOpen(results.data.filter((row) => row.status === "open"));
			},
		});
	};

	const doughnutdata = {
		labels: [`LOST : ${lost.length}`, `WON: ${won.length}`, `OPEN: ${open.length}`],
		datasets: [
			{
				label: "Deal Statistic",
				data: [lost.length, won.length, open.length],
				backgroundColor: ["rgb(199, 4, 4)", "rgb(0, 209, 7)", "rgb(255, 255, 0)"],
				hoverOffset: 4,
			},
		],
	};

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
			<div className=" w-[700px] h-[700px] ">
				{data.length > 0 && <Pie data={doughnutdata} options={options} />}
			</div>
		</div>
	);
}

export default App;
