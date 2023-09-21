import { setCurrentUser } from "../store/user/userSlice";
import axios from "axios";

export const signOutUser = () => {
	localStorage.removeItem("token");
	return setCurrentUser(null);
};

export const signInUser = async (email, password) => {
	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_SERVER_URL}/user/login`,
			{
				email: email,
				password: password,
			}
		);
		const token = data.token;
		localStorage.setItem("token", token);
		const user = await setUser();

		return user;
	} catch (error) {
		throw error;
	}
};

export const signUpUser = async (first_name, last_name, email, password) => {
	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_SERVER_URL}/user/register`,
			{
				first_name: first_name,
				last_name: last_name,
				email: email,
				password: password,
			}
		);

		return data;
	} catch (error) {
		throw error;
	}
};

export const verifyUser = async (verification_code) => {
	try {
		await axios.post(
			`${process.env.REACT_APP_SERVER_URL}/user/verify`,
			{
				verification_code: verification_code,
			}
		);
		return;
	} catch (error) {
		throw error;
	}
};

export const setUser = async () => {
	const token = localStorage.getItem("token");

	let user = null;
	try {
		if (token) {
			const { data } = await axios.get(
				process.env.REACT_APP_SERVER_URL + "/user",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			user = data;
		}

		return setCurrentUser(user);
	} catch (error) {
		throw error;
	}
};
