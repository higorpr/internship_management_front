import api from "./api";

async function getAllClasses(token) {
	const config = { headers: { Authorization: `Bearer ${token}` } };
	const response = await api.get("/classroom/all", config);
	return response.data;
}

export const classApi = { getAllClasses };
