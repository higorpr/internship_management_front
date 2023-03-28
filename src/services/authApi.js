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

export const authApi = { signUp, login };
