import api from "./api";

async function getStudentDataInClass(studentId, classId, token) {
	const config = { headers: { Authorization: `Bearer ${token}` } };
	const response = await api.get(
		`/user/studentData/${studentId}/class/${classId}`,
		config
	);
	return response.data;
}

async function updateStudentStatus(token, body) {
	const config = { headers: { Authorization: `Bearer ${token}` } };
	const response = await api.put("/user/studentStatus", body, config);
	return response.data;
}

export const userApi = { getStudentDataInClass, updateStudentStatus };
