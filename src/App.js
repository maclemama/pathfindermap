import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import useMediaQuery from "./scripts/useMediaQuery";

function App() {
	const isTablet = useMediaQuery("(min-width: 768px)");
	return (
		<div className="App">
			<BrowserRouter>
				<Header />
				<main className="main">
					<Routes>
						<Route
							path="/"
							element={<HomePage />}
							isTablet={isTablet}
						></Route>
					</Routes>
				</main>
			</BrowserRouter>
		</div>
	);
}

export default App;
