import api from "./api";

async function getAllClasses(token) {
	const config = { headers: { Authorization: `Bearer ${token}` } };
	const response = await api.get("/classroom/all", config);
	return response.data;
}

async function postNewClass(token, body) {
	const config = { headers: { Authorization: `Bearer ${token}` } };
	const response = await api.post("/classroom/new", body, config);
	return response.data;
}

export const classApi = { getAllClasses, postNewClass };
