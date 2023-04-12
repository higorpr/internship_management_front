import api from "./api";

async function postNewInternship(token, body) {
	const config = { headers: { Authorization: `Bearer ${token}` } };
	const response = await api.post("/internship/newInternship", body, config);
	return response.data;
}

export const internshipApi = { postNewInternship };
