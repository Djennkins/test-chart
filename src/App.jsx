import { useState } from "react";
import Papa from "papaparse";

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

	return (
		<div className="w-full flex flex-col items-center">
			<input type="file" accept=".csv" onChange={handleFileUpload} />
		</div>
	);
}

export default App;
