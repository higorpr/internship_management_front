import api from "./api";

async function postNewInternship(token, body) {
	const config = { headers: { Authorization: `Bearer ${token}` } };
	const response = await api.post("/internship/newInternship", body, config);
	return response;
}

async function deleteInternship(token, internshipId) {
	const config = { headers: { Authorization: `Bearer ${token}` } };
	const response = await api.delete(
		`/internship/delete/${internshipId}`,
		config
	);
	return response.data;
}

export const internshipApi = { postNewInternship, deleteInternship };
