import "./App.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

import { setUser } from "./scripts/userUtils";

import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import AuthPage from "./pages/AuthPage/AuthPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
	const mapRef = useRef();
	const dispatch = useDispatch();

	useEffect(() => {
		const userCheck = async () => {
			const setUserAction = await setUser();
			dispatch(setUserAction);
		};
		userCheck();
	}, [dispatch]);

	return (
		<div className="App">
			<BrowserRouter>
				<Header />
				<main className="main">
					<Routes>
						<Route path="/" element={<HomePage mapRef={mapRef} />}></Route>
						<Route
							path="/signin"
							element={<AuthPage action={"signin"} />}
						></Route>
						<Route
							path="/signup"
							element={<AuthPage action={"signup"} />}
						></Route>
						<Route
							path="/user/verify/:verification_code"
							element={<AuthPage action={"verify"} />}
						></Route>
						<Route
							path="/profile"
							element={<ProfilePage mapRef={mapRef} />}
						></Route>
						<Route path="*" element={<AuthPage action={"not-found"} />}></Route>
					</Routes>
				</main>
			</BrowserRouter>
		</div>
	);
}

export default App;
