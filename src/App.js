import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import useMediaQuery from "./scripts/useMediaQuery";
import AuthPage from "./pages/AuthPage/AuthPage";

function App() {
	const isTablet = useMediaQuery("(min-width: 768px)");
	return (
		<div className="App">
			<BrowserRouter>
				<Header />
				<main className="main">
					<Routes>
						<Route path="/" element={<HomePage isTablet={isTablet}/>}></Route>
						<Route path="/signin" element={<AuthPage action={"signin"}/>}></Route>
						<Route path="/signup" element={<AuthPage action={"signup"}/>}></Route>
						<Route path="/user/verify/:verification_code" element={<AuthPage action={"verify"}/>}></Route>
					</Routes>
				</main>
			</BrowserRouter>
		</div>
	);
}

export default App;
