import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import AuthPage from "./pages/AuthPage/AuthPage";
import { useState } from "react";

function App() {
	const [checkedSignin, setCheckedSignin] = useState(false);
	const [user, setUser] = useState(null);
	const [signedin, setSignedin] = useState(false);
	return (
		<div className="App">
			<BrowserRouter>
				<Header
					checkedSignin={checkedSignin}
					setCheckedSignin={setCheckedSignin}
					setUser={setUser}
					user={user}
					setSignedin={setSignedin}
					signedin={signedin}
				/>
				<main className="main">
					<Routes>
						<Route path="/" element={<HomePage />}></Route>
						<Route
							path="/signin"
							element={<AuthPage action={"signin"} signedin={signedin} />}
						></Route>
						<Route
							path="/signup"
							element={<AuthPage action={"signup"} signedin={signedin} />}
						></Route>
						<Route
							path="/user/verify/:verification_code"
							element={<AuthPage action={"verify"} signedin={signedin} />}
						></Route>
					</Routes>
				</main>
			</BrowserRouter>
		</div>
	);
}

export default App;
