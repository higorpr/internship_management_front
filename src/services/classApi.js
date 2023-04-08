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

async function postEnrollStudent(token, body) {
	const config = { headers: { Authorization: `Bearer ${token}` } };
	const response = await api.post("/classroom/newStudent", body, config);
	return response.data;
}

async function getStudentClasses(token) {
	const config = { headers: { Authorization: `Bearer ${token}` } };
	const response = await api.get("/classroom/studentClasses", config);
	return response.data;
}

async function getClassInfo(token, classId) {
	const config = { headers: { Authorization: `Bearer ${token}` } };
	const response = await api.get(
		`/classroom/singleClassInfo/${classId}`,
		config
	);
	return response.data;
}

export const classApi = {
	getAllClasses,
	postNewClass,
	postEnrollStudent,
	getStudentClasses,
	getClassInfo,
};
