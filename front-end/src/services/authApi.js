import api from "./api";

async function signUp(name, email, password) {
	const body = { name, email, password };
	const response = await api.post("/auth/sign-up", body);
	return response.data;
}

async function login(email, password) {
	const body = { email, password };
	const response = await api.post("/auth/login", body);
	return response.data;
}

async function validateEmail(email, confirmationCode) {
	const body = { email, confirmationCode };
	const response = await api.put("/auth/usermail", body);
	return response;
}

async function requestNewPassword(email) {
	const body = { email };
	const response = await api.post("/auth/newpasswordrequest", body);
	return response;
}

async function updatePassword(token, password) {
	const body = { token, password };
	const response = await api.put("/auth/updatepassword", body);
	return response.data;
}

export const authApi = {
	signUp,
	login,
	validateEmail,
	requestNewPassword,
	updatePassword,
};
