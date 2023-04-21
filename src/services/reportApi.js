import api from "./api";

async function updateReportStatus(token, body) {
	const config = { headers: { Authorization: `Bearer ${token}` } };
	const response = await api.put("/report/reportStatus", body, config);
	return response.data;
}

async function sendReport(token, formData) {
	const config = { headers: { Authorization: `Bearer ${token}` } };
	const response = await api.post("/report/sendReport", formData, config);
	return response.data;
}

export const reportApi = { updateReportStatus, sendReport };
