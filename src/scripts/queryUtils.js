import axios from "axios";

export const getRawRoutes = async (payload) => {
	try {
		const token = localStorage.getItem("token");
		let headers = {};
		if (token) {
			headers = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
		}

		const { data } = await axios.post(
			process.env.REACT_APP_SERVER_URL + "/query",
			payload,
			headers
		);

		return data;
	} catch (error) {
		throw error;
	}
};
