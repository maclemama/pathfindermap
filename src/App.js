import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Header />
				<main className="main">
					<Routes>
						<Route path="/" element={<HomePage />}></Route>
					</Routes>
				</main>
			</BrowserRouter>
		</div>
	);
}

export default App;
