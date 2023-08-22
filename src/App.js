import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<h1 className="placeholder">Pathfinder Map</h1>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
        </Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
