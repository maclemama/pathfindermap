import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import AuthPage from "./pages/AuthPage/AuthPage";
import { useState, useRef, useMemo, useEffect, createContext } from "react";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import axios from "axios";

export const UserContext = createContext(null);

function App() {
	const [user, setUser] = useState(null);
	const mapRef = useRef();
	const token = localStorage.getItem("token");

	useMemo(() => {
		if (!token && user) {
			setUser(null);
		}
	}, [token]);

	useEffect(() => {
		if (token) {
			axios
				.get(process.env.REACT_APP_SERVER_URL + "/user", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					setUser(res.data);
				})
				.catch((error) => {
					localStorage.removeItem("token");
					setUser(null);
				});
		}
	}, []);

	return (
		<div className="App">
			<BrowserRouter>
				<UserContext.Provider value={{ user, setUser }}>
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
							<Route
								path="*"
								element={<AuthPage action={"not-found"} />}
							></Route>
						</Routes>
					</main>
				</UserContext.Provider>
			</BrowserRouter>
		</div>
	);
}

export default App;
